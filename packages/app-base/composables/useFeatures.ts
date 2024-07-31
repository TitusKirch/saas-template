import { useFeatureStore } from '@tituskirch/app-base/stores/feature';

export default function () {
  const featureStore = useFeatureStore();
  const featureStoreRefs = storeToRefs(featureStore);

  const { getFeatures } = useApiFeatures();
  const {
    data: fetchFeaturesData,
    status: fetchFeaturesStatus,
    execute: fetchFeatures,
    error: fetchFeaturesError,
  } = getFeatures({
    options: {
      immediate: false,
      watch: false,
    },
  });
  watch(fetchFeaturesData, (newData) => {
    if (!newData?.data) {
      return;
    }
    featureStore.reset();
    featureStore.setFeatures({ features: newData.data });
  });

  return {
    ...featureStore,
    ...featureStoreRefs,
    fetchFeatures,
    fetchFeaturesData,
    fetchFeaturesError,
    fetchFeaturesStatus,
  };
}
