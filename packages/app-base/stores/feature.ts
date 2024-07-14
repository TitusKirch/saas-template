import { useUserStore } from '@tituskirch/app-base/stores/user';

export const useFeatureStore = defineStore('feature', () => {
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

    const { get } = useApi();
    const { data } = await get<FeaturesRequestData, FeaturesResponse>('features', {
      version: 'v1',
    });

    features.value = data.value?.data || [];
  };
  const fetchFeature = async ({ name }: { name: FeatureName }) => {
    const { get } = useApi();
    const { data } = await get<FeaturesShowRequestData, FeaturesShowResponse>(`features/${name}`, {
      version: 'v1',
    });

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
  const userStore = useUserStore();
  watch(
    () => userStore.user,
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
