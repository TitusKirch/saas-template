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

    // user password confirm modal
    const userPasswordConfirmModalIsOpen = ref(false);
    const userPasswordConfirmModalSuccessCallback = ref<() => void>(() => {});
    const resetUserPasswordConfirmModalSuccessCallback = () => {
      userPasswordConfirmModalSuccessCallback.value = () => {};
    };
    const setUserPasswordConfirmModalSuccessCallback = ({ callback }: { callback: () => void }) => {
      userPasswordConfirmModalSuccessCallback.value = callback;
    };
    const executeUserPasswordConfirmModalSuccessCallback = async () => {
      console.log('executeUserPasswordConfirmModalSuccessCallback');
      await userPasswordConfirmModalSuccessCallback.value();
      console.log('executeUserPasswordConfirmModalSuccessCallback done');
      hideUserPasswordConfirmModal();
    };
    const showUserPasswordConfirmModal = () => {
      userPasswordConfirmModalIsOpen.value = true;
    };
    const hideUserPasswordConfirmModal = () => {
      userPasswordConfirmModalIsOpen.value = false;
      resetUserPasswordConfirmModalSuccessCallback();
    };
    const toggleUserPasswordConfirmModal = () => {
      userPasswordConfirmModalIsOpen.value = !userPasswordConfirmModalIsOpen.value;
    };

    return {
      userPasswordConfirmed,
      userPasswordConfirmedAt,
      confirmUserPasswordConfirmed,
      resetUserPasswordConfirmed,
      userPasswordConfirmModalIsOpen,
      resetUserPasswordConfirmModalSuccessCallback,
      setUserPasswordConfirmModalSuccessCallback,
      executeUserPasswordConfirmModalSuccessCallback,
      showUserPasswordConfirmModal,
      hideUserPasswordConfirmModal,
      toggleUserPasswordConfirmModal,
    };
  },
  {
    persist: {
      paths: ['userPasswordConfirmed', 'userPasswordConfirmedAt'],
    },
  }
);
