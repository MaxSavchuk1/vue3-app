import pluginVue from 'eslint-plugin-vue'
import vueTsEslintConfig from '@vue/eslint-config-typescript'

export default [
  ...pluginVue.configs['flat/essential'],

  ...vueTsEslintConfig({
    // Optional: extend additional configurations from `typescript-eslint`.
    // Supports all the configurations in https://typescript-eslint.io/users/configs#recommended-configurations
    extends: ['recommended'],
    supportedScriptLangs: {
      ts: true,
      js: false,
      tsx: false,
      jsx: false
    }
  }),
  {
    rules: {
      "@typescript-eslint/no-explicit-any": "off"
    }
  }
]
