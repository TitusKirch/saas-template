type Search = {
  id: BigInt;
  name: string;
  link?: string;
};

type SearchRequestData = undefined;
type SearchRequestParams = {
  query: string;
};
type SearchResponse = ApiResourceResponse<Search[]>;
