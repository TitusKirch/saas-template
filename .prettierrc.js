/** @type {import("prettier").Options} */
const config = {
  // plugins: [require('prettier-plugin-tailwindcss')],
  // tailwindConfig: './packages/ui/tailwind.config.ts',
  endOfLine: 'lf',
  printWidth: 100,
  semi: true,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: 'es5',
  useTabs: false,
  vueIndentScriptAndStyle: true,
}

module.exports = config
