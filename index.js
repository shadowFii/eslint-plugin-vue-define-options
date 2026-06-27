module.exports = {
    rules: {
        'define-options-required': require('./rules/define-options-required'),
    },
    // Optional: predefined configs
    configs: {
        recommended: {
            plugins: ['@shadowfii/vue-define-options'],
            rules: {
                '@shadowfii/vue-define-options/define-options-required': 'error',
            },
        },
    },
}