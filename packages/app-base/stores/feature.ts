export const useFeatureStore = defineStore('feature', () => {
  const features = ref<Feature[]>([]);
  const setFeature = ({ feature: newFeature }: { feature: Feature }) => {
    features.value = features.value.map((feature) =>
      feature.name === newFeature.name ? newFeature : feature
    );
  };
  const setFeatures = ({ features: newFeatures }: { features: Feature[] }) => {
    features.value = newFeatures;
  };
  const reset = () => {
    features.value = [];
  };

  // active checks
  const active = ({ name }: { name: FeatureName }) =>
    features.value.some((feature) => feature.name === name && !!feature.value);
  const allAreActive = ({ names }: { names: FeatureName[] }) =>
    names.every((name) => active({ name }));

  const someAreActive = ({ names }: { names: FeatureName[] }) =>
    names.some((name) => active({ name }));

  // inactive checks
  const inactive = ({ name }: { name: FeatureName }) =>
    !active({
      name,
    });
  const allAreInactive = ({ names }: { names: FeatureName[] }) =>
    names.every((name) => inactive({ name }));
  const someAreInactive = ({ names }: { names: FeatureName[] }) =>
    names.some((name) => inactive({ name }));

  // value
  const value = ({ name }: { name: FeatureName }) =>
    features.value.find((feature) => feature.name === name)?.value;
  const values = ({ names }: { names: FeatureName[] }) => names.map((name) => value({ name }));

  return {
    active,
    allAreActive,
    allAreInactive,
    features,
    inactive,
    reset,
    setFeature,
    setFeatures,
    someAreActive,
    someAreInactive,
    value,
    values,
  };
});
