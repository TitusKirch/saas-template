import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

// NOTE: FA PRO
// import { faProBrands, faProLight } from '@tituskirch/font-awesome-pro-iconify';

const currentDir = dirname(fileURLToPath(import.meta.url))

export default defineNuxtConfig({
  alias: {
    '@tituskirch/app-base': currentDir,
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
  experimental: {
    externalVue: false,
  },
  extends: ['@nuxt/ui-pro'],
  nitro: {
    prerender: {
      autoSubfolderIndex: false,
    },
  },
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
    configFile: join(currentDir, './formkit.config.ts'),
  },
  i18n: {
    langDir: './locales',
    lazy: true,
    strategy: 'prefix_and_default',
    defaultLocale: 'en-GB',
    locales: [
      { code: 'de-DE', iso: 'de-DE', files: ['de.json'] },
      { code: 'en-GB', iso: 'en-GB', files: ['en.json'] },
    ],
  },
  security: {
    corsHandler: {
      origin: [
        process.env.BASE_URL || 'http://localhost:3000',
        process.env.API_URL || 'http://localhost:8000',
      ],
    },
    headers: {
      contentSecurityPolicy: {
        'img-src': ["'self'", 'data:', 'blob:'],
        'form-action': ["'self'"],
      },
      crossOriginEmbedderPolicy:
        process.env.NODE_ENV === 'development' ? 'unsafe-none' : 'require-corp',
    },
  },
  tailwindcss: {
    configPath: join(currentDir, 'tailwind.config.ts'),
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
      apiUrl: process.env.API_URL || 'http://localhost:8000',
    },
  },
})
