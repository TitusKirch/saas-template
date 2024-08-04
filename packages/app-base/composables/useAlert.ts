import { useAlertStore } from '@tituskirch/app-base/stores/alert';

export default function () {
  const alertStore = useAlertStore();
  const alertStoreRefs = storeToRefs(alertStore);

  const getColorByType = ({ type }: { type: AlertType }) => {
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
  const getIconByType = ({ type }: { type: AlertType }) => {
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

  return {
    ...alertStore,
    ...alertStoreRefs,
    getColorByType,
    getIconByType,
  };
}
