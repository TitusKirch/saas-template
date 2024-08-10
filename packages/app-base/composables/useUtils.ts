export default function () {
  const { t } = useI18n();

  const copyToClipboard = ({ value }: { value: string }) => {
    navigator.clipboard.writeText(value);
    useNotification({
      type: 'success',
      title: t('copy.button.notification.success.title'),
      description: t('copy.button.notification.success.description'),
    });
  };

  return {
    copyToClipboard,
  };
}
