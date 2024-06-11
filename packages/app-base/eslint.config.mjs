import withNuxt from './.nuxt/eslint.config.mjs';
import tailwind from 'eslint-plugin-tailwindcss';

export default withNuxt(tailwind.configs['flat/recommended']).override('tailwindcss:rules', {
  rules: {
    'tailwindcss/no-custom-classname': [
      'warn',
      {
        whitelist: ['^(bg|text)-primary-(50|100|200|300|400|500|600|700|800|900|950)$'],
      },
    ],
  },
});
