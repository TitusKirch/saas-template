import { useAppStore } from '@tituskirch/app-base/stores/app';

export default function ({ type }: { type: 'email' | 'password' }) {
  const appStore = useAppStore();
  if (type === 'email') {
    const { t } = useI18n();

    return appStore.randomValue > 0.5
      ? t('global.email.placeholder.female')
      : t('global.email.placeholder.male');
  } else if (type === 'password') {
    return '●●●●●●●●';
  }
}
