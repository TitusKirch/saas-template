export default function ({
  description,
  title,
  type = 'info',
}: {
  description?: string;
  title: string;
  type: 'error' | 'info' | 'success' | 'warning';
}) {
  const color = () => {
    switch (type) {
      case 'info':
        return 'blue';
      case 'success':
        return 'green';
      case 'warning':
        return 'orange';
      case 'error':
        return 'red';
    }
  };
  const icon = () => {
    switch (type) {
      case 'info':
        return 'i-fa6-solid-circle-info';
      case 'success':
        return 'i-fa6-solid-circle-check';
      case 'warning':
        return 'i-fa6-solid-triangle-exclamation';
      case 'error':
        return 'i-fa6-solid-circle-exclamation';
    }
  };

  const toast = useToast();
  toast.add({
    title: title,
    description,
    icon: icon(),
    color: color(),
  });
}
