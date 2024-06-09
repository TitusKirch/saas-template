export default function ({
  description,
  title,
  type = 'info',
}: {
  description?: string;
  title: string;
  type: AlertType;
}) {
  const { getColorByType, getIconByType } = useAlertStyle();
  const toast = useToast();
  toast.add({
    title: title,
    description,
    icon: getIconByType({ type }),
    color: getColorByType({ type }),
  });
}
