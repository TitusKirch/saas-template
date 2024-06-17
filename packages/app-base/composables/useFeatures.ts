import { useFeatureStore } from '@tituskirch/app-base/stores/feature';

export default function () {
  const featureStore = useFeatureStore();

  // active checks
  const active = ({ name }: { name: FeatureName }) => {
    featureStore.fetchFeatures();
    return featureStore.features.some((feature) => feature.name === name && !!feature.value);
  };
  const allAreActive = ({ names }: { names: FeatureName[] }) => {
    return names.every((name) => active({ name }));
  };
  const someAreActive = ({ names }: { names: FeatureName[] }) => {
    return names.some((name) => active({ name }));
  };

  // inactive checks
  const inactive = ({ name }: { name: FeatureName }) => {
    return !active({
      name,
    });
  };
  const allAreInactive = ({ names }: { names: FeatureName[] }) => {
    return names.every((name) => inactive({ name }));
  };
  const someAreInactive = ({ names }: { names: FeatureName[] }) => {
    return names.some((name) => inactive({ name }));
  };

  // value
  const value = ({ name }: { name: FeatureName }) => {
    featureStore.fetchFeatures();
    const feature = featureStore.features.find((feature) => feature.name === name);
    return feature?.value;
  };
  const values = ({ names }: { names: FeatureName[] }) => {
    return names.map((name) => value({ name }));
  };

  return {
    active,
    allAreActive,
    someAreActive,
    inactive,
    allAreInactive,
    someAreInactive,
    value,
    values,
  };
}
