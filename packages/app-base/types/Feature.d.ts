type FeatureName = 'new-dashboard';

type Feature = {
  name: FeatureName;
  value: boolean | number | string;
};

type FeaturesIndexResponse = ApiResourceResponse<Feature[]>;
type FeaturesIndexRequestData = undefined;
type FeaturesShowResponse = ApiResourceResponse<Feature>;
type FeaturesShowRequestData = undefined;
