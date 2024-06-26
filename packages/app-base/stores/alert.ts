export const useAlertStore = defineStore(
  'alert',
  () => {
    const alerts = ref<Alert[]>([]);
    const getNonComponentAlerts = computed(() =>
      alerts.value.filter((alert) => !alert.isComponent)
    );

    const addAlert = (alert: Alert) => {
      alerts.value.push(alert);
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
      alerts,
      getNonComponentAlerts,
      addAlert,
      triggerPageChange,
      removeAlert,
      hiddenAlerts,
      hideAlert,
    };
  },
  {
    persist: {
      paths: ['hiddenAlerts'],
    },
  }
);
