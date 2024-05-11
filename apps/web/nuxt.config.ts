// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  extends: ['../../packages/app-base'],
  i18n: {
    langDir: './locales',
    lazy: true,
    strategy: 'prefix_and_default',
    defaultLocale: 'de-DE',
    locales: [
      { code: 'de-DE', iso: 'de-DE', files: ['de.json'] },
      { code: 'en-GB', iso: 'en-GB', files: ['en.json'] },
    ],
  },
})
