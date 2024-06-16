export const useAuthStore = defineStore(
  'auth',
  () => {
    // user password confirmed status
    const userPasswordConfirmed = ref(false);
    const userPasswordConfirmedAt = ref<Date | null>(null);
    const confirmUserPasswordConfirmed = () => {
      userPasswordConfirmed.value = true;
      userPasswordConfirmedAt.value = new Date();
    };
    const resetUserPasswordConfirmed = () => {
      userPasswordConfirmed.value = false;
      userPasswordConfirmedAt.value = null;
    };

    // general
    const reset = () => {
      resetUserPasswordConfirmed();
    };

    return {
      userPasswordConfirmed,
      userPasswordConfirmedAt,
      confirmUserPasswordConfirmed,
      resetUserPasswordConfirmed,
      reset,
    };
  },
  {
    persist: {
      paths: ['userPasswordConfirmed', 'userPasswordConfirmedAt'],
    },
  }
);
