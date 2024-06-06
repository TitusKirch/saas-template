import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { withoutTrailingSlash } from 'ufo';

// NOTE: FA PRO
// import { faProBrands, faProLight } from '@tituskirch/font-awesome-pro-iconify';

const currentDir = dirname(fileURLToPath(import.meta.url));

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
    '@vueuse/nuxt',
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
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
        withoutTrailingSlash(process.env.BASE_URL) || 'http://localhost:3000',
        withoutTrailingSlash(process.env.API_URL) || 'http://localhost:8000',
      ],
    },
    headers: {
      contentSecurityPolicy: {
        'img-src': ["'self'", 'data:', 'blob:', 'https://avatars.githubusercontent.com'],
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
    safelistColors: ['blue', 'green', 'orange', 'red'],
    icons: ['fa6-brands', 'fa6-solid'],
    // icons: {
    //   collections: {
    //     // fab: faProBrands,
    //     // fal: faProLight,
    //   },
    // },
  },
  runtimeConfig: {
    public: {
      apiUrl: withoutTrailingSlash(process.env.API_URL) || 'http://localhost:8000',
      appName: process.env.APP_NAME || 'unkown app',
      appVersion: process.env.APP_VERSION || 'latest',
      authPagesActive: false,
      baseUrl: withoutTrailingSlash(process.env.BASE_URL) || 'http://localhost:3000',
      formkitProKey: (process.env.FORMKIT_PRO_KEY as string) || '',
      nodeEnv: process.env.NODE_ENV || 'production',
    },
  },
});
