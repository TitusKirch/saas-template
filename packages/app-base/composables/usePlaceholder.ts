import { useAppStore } from '@tituskirch/app-base/stores/app';

export default function ({ type }: { type: 'email' | 'first_name' | 'last_name' | 'password' }) {
  const appStore = useAppStore();
  if (type === 'email') {
    const { t } = useI18n();

    return appStore.randomValue > 0.5 ? t('email.placeholder.female') : t('email.placeholder.male');
  } else if (type === 'first_name') {
    const { t } = useI18n();

    return appStore.randomValue > 0.5
      ? t('first_name.placeholder.female')
      : t('first_name.placeholder.male');
  } else if (type === 'last_name') {
    const { t } = useI18n();

    return appStore.randomValue > 0.5
      ? t('last_name.placeholder.female')
      : t('last_name.placeholder.male');
  } else if (type === 'password') {
    return '●●●●●●●●';
  }
}
