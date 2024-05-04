import type { I18nOptions } from 'vue-i18n'

export const baseConfig: I18nOptions = {
  legacy: false,
  fallbackLocale: {
    default: ['de-DE'],
  },
  fallbackWarn: false,
  missingWarn: false,
  datetimeFormats: {
    'de-DE': {
      long: {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
      },
    },
  },
  numberFormats: {
    'de-DE': {
      percent: {
        style: 'percent',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      },
    },
  },
}

export default defineI18nConfig(() => baseConfig)
