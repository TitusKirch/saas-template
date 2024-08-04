export const useAlertStore = defineStore(
  'alert',
  () => {
    const alerts = ref<Alert[]>([]);
    const getNonComponentAlerts = computed(() =>
      alerts.value.filter((alert) => !alert.isComponent)
    );

    const addAlert = ({ alert }: { alert: Alert }) => {
      alerts.value.push({
        isNonPersistent: true,
        isComponent: false,
        ...alert,
      });
    };
    const addGlobalAlert = ({ alert }: { alert: Alert }) => {
      addAlert({ alert: { ...alert, isGlobal: true } });
    };
    const addGlobalFlashAlert = ({ alert }: { alert: Alert }) => {
      addGlobalAlert({ alert: { ...alert, isFlashAlert: true, isHidden: true } });
    };
    const addFlashAlert = ({ alert }: { alert: Alert }) => {
      addAlert({ alert: { ...alert, isFlashAlert: true, isHidden: true } });
    };
    const removeAlert = ({ id }: { id: string }) => {
      alerts.value = alerts.value.filter((alert) => alert.id !== id);
    };

    const triggerPageChange = () => {
      alerts.value = alerts.value.filter((alert) => alert.isGlobal || alert.isFlashAlert);
      alerts.value.forEach((alert) => {
        if (alert.isFlashAlert) {
          alert.isFlashAlert = false;
          alert.isHidden = false;
        }
      });
    };

    const hiddenAlerts = ref<string[]>([]);
    const hideAlert = ({ id }: { id: string }) => {
      const alert = alerts.value.find((alert) => alert.id === id);
      if (alert?.isNonPersistent) {
        alert.isHidden = true;
      } else {
        hiddenAlerts.value.push(id);
      }
    };

    return {
      addAlert,
      addFlashAlert,
      addGlobalAlert,
      addGlobalFlashAlert,
      alerts,
      getNonComponentAlerts,
      hiddenAlerts,
      hideAlert,
      removeAlert,
      triggerPageChange,
    };
  },
  {
    persist: {
      paths: ['hiddenAlerts'],
    },
  }
);
