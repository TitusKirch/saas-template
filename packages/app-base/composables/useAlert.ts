import { useAlertStore } from '@tituskirch/app-base/stores/alert';

export default function () {
  const alertStore = useAlertStore();

  const addAlert = (alert: Alert) => {
    alertStore.addAlert({
      ...alert,
      isNonPersistent: alert.isNonPersistent || true,
      isComponent: alert.isComponent || false,
    });
  };
  const addGlobalAlert = (alert: Alert) => {
    addAlert({ ...alert, isGlobal: true });
  };
  const addGlobalFlashAlert = (alert: Alert) => {
    addGlobalAlert({ ...alert, isFlashAlert: true, isHidden: true });
  };
  const addFlashAlert = (alert: Alert) => {
    addAlert({ ...alert, isFlashAlert: true, isHidden: true });
  };

  const removeAlert = ({ id }: { id: string }) => {
    alertStore.removeAlert({ id });
  };
  const triggerPageChange = () => {
    alertStore.triggerPageChange();
  };

  const hideAlert = ({ id }: { id: string }) => {
    alertStore.hideAlert({ id });
  };

  return {
    addAlert,
    addGlobalAlert,
    addGlobalFlashAlert,
    addFlashAlert,
    removeAlert,
    triggerPageChange,
    hideAlert,
  };
}
