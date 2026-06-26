# @shadowFii/eslint-plugin-vue-define-options

An ESLint plugin for Vue 3 that enforces two things in every `<script setup>` block:

1. `defineOptions()` **must be called** — omitting it entirely is an error.
2. The call **must include a `name` property** — `defineOptions({})` or `defineOptions({ inheritAttrs: false })` without `name` is an error.

Without a `name`, Vue DevTools and error stack traces show generic component labels. This rule catches both omissions at lint time.

## Rules

| Rule | Description | Recommended |
|------|-------------|-------------|
| `@shadowFii/vue-define-options/define-options-required` | Require `defineOptions({ name })` in every `<script setup>` | ✅ |

## Installation

```bash
npm install --save-dev @shadowFii/eslint-plugin-vue-define-options
```

The plugin uses `vue-eslint-parser` to understand `.vue` files, so install that too if you haven't already:

```bash
npm install --save-dev vue-eslint-parser
```

## Usage

### Flat config (`eslint.config.js`)

```js
import vueDefineOptions from '@shadowFii/eslint-plugin-vue-define-options'

export default [
  {
    plugins: {
      '@shadowFii/vue-define-options': vueDefineOptions,
    },
    rules: {
      '@shadowFii/vue-define-options/define-options-required': 'error',
    },
  },
]
```

### Legacy config (`.eslintrc.js`)

```js
module.exports = {
  plugins: ['@shadowFii/vue-define-options'],
  rules: {
    '@shadowFii/vue-define-options/define-options-required': 'error',
  },
}
```

### Recommended config

```js
// eslint.config.js
import vueDefineOptions from '@shadowFii/eslint-plugin-vue-define-options'

export default [vueDefineOptions.configs.recommended]
```

## Examples

**Incorrect**

```vue
<!-- No defineOptions call at all -->
<script setup>
const x = 1
</script>

<!-- Called with no argument -->
<script setup>
defineOptions()
</script>

<!-- Object provided but name is missing -->
<script setup>
defineOptions({ inheritAttrs: false })
</script>
```

**Correct**

```vue
<script setup>
defineOptions({
  name: 'MyComponent',
  inheritAttrs: false,
})
</script>
```

## License

ISC
