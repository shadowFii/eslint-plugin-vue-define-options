module.exports = {
    rules: {
        'define-options-required': require('./rules/define-options-required'),
    },
    // Optional: predefined configs
    configs: {
        recommended: {
            plugins: ['@shadowFii/vue-define-options'],
            rules: {
                '@shadowFii/vue-define-options/define-options-required': 'error',
            },
        },
    },
}