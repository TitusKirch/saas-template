import { createResolver } from '@nuxt/kit'

// NOTE: FA PRO
// import { faProBrands, faProLight } from '@TitusKirch/font-awesome-pro-iconify';

const { resolve } = createResolver(import.meta.url)

export default defineNuxtConfig({
  alias: {
    '@TitusKirch/app-base': resolve('./'),
  },
  modules: [
    '@nuxt/eslint',
    '@nuxt/test-utils/module',
    '@nuxt/ui',
    '@formkit/nuxt',
    '@nuxtjs/i18n',
    'nuxt-security',
    '@pinia/nuxt',
  ],
  extends: ['@nuxt/ui-pro'],
  build: {
    transpile: [
      // fix https://github.com/FortAwesome/vue-fontawesome/issues/394 (https://github.com/nuxt/nuxt/discussions/16014#discussioncomment-2477885)
      '@fortawesome/fontawesome-common-types',
      '@fortawesome/free-brands-svg-icons',
      // NOTE: FA PRO
      // '@fortawesome/pro-light-svg-icons',
      '@fortawesome/vue-fontawesome',
    ],
  },
  colorMode: {
    classSuffix: '',
    // TODO: Store color mode in cookie to support subdomains
    storageKey: 'color-mode',
  },
  devtools: { enabled: true },
  formkit: {
    autoImport: false,
    configFile: resolve('./formkit.config.ts'),
  },
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
  security: {
    headers: {
      contentSecurityPolicy: {
        'img-src': ["'self'", 'data:'],
        'form-action': ["'self'"],
      },
      crossOriginEmbedderPolicy:
        process.env.NODE_ENV === 'development' ? 'unsafe-none' : 'require-corp',
    },
    corsHandler: {
      origin: [process.env.BASE_URL || 'http://localhost:3000'],
    },
  },
  ui: {
    global: true,
    safelistColors: ['error', 'info', 'success', 'warning'],
    icons: {
      collections: {
        // fab: faProBrands,
        // fal: faProLight,
      },
    },
  },
  runtimeConfig: {
    public: {
      baseUrl: process.env.BASE_URL || 'http://localhost:3000',
      nodeEnv: process.env.NODE_ENV || 'production',
      appName: process.env.APP_NAME || 'unkown app',
      appVersion: process.env.APP_VERSION || 'latest',
      formkitProKey: (process.env.FORMKIT_PRO_KEY as string) || '',
    },
  },
})
