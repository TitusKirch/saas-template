export default function () {
  const copyToClipboard = ({ value }: { value: string }) => {
    navigator.clipboard.writeText(value);
    useNotification({
      type: 'success',
      title: 'copy.button.notification.success.title',
      description: 'copy.button.notification.success.description',
    });
  };

  return {
    copyToClipboard,
  };
}
