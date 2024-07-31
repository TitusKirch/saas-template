export const useFeatureStore = defineStore('feature', () => {
  const { currentUser } = useNewCurrentUser();
  const features = ref<Feature[]>([]);

  // general
  const reset = async ({ fetch = false }: { fetch?: boolean }) => {
    features.value = [];
    if (fetch) {
      await fetchFeatures();
    }
  };

  // fetching
  const fetchFeatures = async () => {
    if (features.value.length) {
      return;
    }

    const { data } = await useApiFetch<FeaturesRequestData, FeaturesResponse>('features');

    features.value = data.value?.data || [];
  };
  const fetchFeature = async ({ name }: { name: FeatureName }) => {
    const { data } = await useApiFetch<FeaturesShowRequestData, FeaturesShowResponse>(
      `features/${name}`
    );

    if (!data.value) {
      return;
    }

    // check if feature exists in features array
    const existingFeature = features.value.find((feature) => feature.name === name);
    if (existingFeature) {
      Object.assign(existingFeature, data.value);
    } else {
      features.value.push(data.value.data);
    }
  };

  // watch user
  watch(
    () => currentUser.value,
    async (oldUser, newUser) => {
      if (!oldUser || !newUser || oldUser.id !== newUser.id) {
        await reset({ fetch: true });
      }
    }
  );

  return {
    features,
    reset,
    fetchFeatures,
    fetchFeature,
  };
});
