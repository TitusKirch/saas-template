type FeatureName = 'new-dashboard';

type Feature = {
  name: FeatureName;
  value: boolean | number | string;
};

type FeaturesResponse = ApiResourceResponse<Feature[]>;
type FeaturesRequestData = undefined;
type FeaturesShowResponse = ApiResourceResponse<Feature>;
type FeaturesShowRequestData = undefined;
