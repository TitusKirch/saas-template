export const useAppStore = defineStore('app', () => {
  const randomValue = ref(Math.random());

  return {
    randomValue,
  };
});
