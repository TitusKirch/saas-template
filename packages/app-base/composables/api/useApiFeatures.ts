import type { FetchOptions } from '@tituskirch/app-base/types/Fetch';

export default function () {
  const getFeatures = ({ options }: { options?: FetchOptions<FeaturesResponse> } = {}) =>
    useApiFetch<FeaturesRequestData, FeaturesResponse>('features', {
      ...options,
    });
  const getFeatureByName = ({
    name,
    options,
  }: {
    name: FeatureName;
    options?: FetchOptions<FeaturesShowResponse>;
  }) =>
    useApiFetch<FeaturesShowRequestData, FeaturesShowResponse>(`features/${name}`, {
      ...options,
    });

  return {
    getFeatures,
    getFeatureByName,
  };
}
