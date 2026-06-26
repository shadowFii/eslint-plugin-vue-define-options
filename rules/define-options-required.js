/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
    meta: {
        type: 'problem',
        docs: {
            description: 'Require `defineOptions({ name })` in every Vue <script setup> block',
            recommended: true,
        },
        schema: [],
        messages: {
            missingDefineOptions: '`defineOptions()` is required in <script setup> blocks.',
            missingArgument: '`defineOptions()` must be called with an object containing a `name` property.',
            missingName: '`defineOptions()` must include a `name` property.',
        },
    },

    create(context) {
        const filename = context.filename ?? context.getFilename()
        const isVueFile = filename.endsWith('.vue')

        let defineOptionsCalled = false

        return {
            CallExpression(node) {
                if (node.callee.type !== 'Identifier' || node.callee.name !== 'defineOptions') {
                    return
                }

                defineOptionsCalled = true

                const arg = node.arguments[0]

                if (!arg || arg.type !== 'ObjectExpression') {
                    context.report({ node, messageId: 'missingArgument' })
                    return
                }

                const hasName = arg.properties.some(
                    (prop) =>
                        prop.type === 'Property' &&
                        !prop.computed &&
                        ((prop.key.type === 'Identifier' && prop.key.name === 'name') ||
                            (prop.key.type === 'Literal' && prop.key.value === 'name'))
                )

                if (!hasName) {
                    context.report({ node: arg, messageId: 'missingName' })
                }
            },

            'Program:exit'(programNode) {
                if (!isVueFile || defineOptionsCalled) return

                const services = context.sourceCode?.parserServices ?? context.parserServices
                if (!services || typeof services.getDocumentFragment !== 'function') return

                const df = services.getDocumentFragment()
                if (!df) return

                const hasScriptSetup = df.children.some(
                    (child) =>
                        child.type === 'VElement' &&
                        child.rawName === 'script' &&
                        child.startTag.attributes.some(
                            (attr) => !attr.directive && attr.key.rawName === 'setup'
                        )
                )

                if (hasScriptSetup) {
                    context.report({ node: programNode, messageId: 'missingDefineOptions' })
                }
            },
        }
    },
}
