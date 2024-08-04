type Team = {
  id: BigInt;
  name: string;
  description?: string;
  created_at: string;
  updated_at: string;
};

type TeamsResponse = ApiResourceResponse<Team[]>;
type TeamsRequestData = undefined;

type TeamsShowResponse = ApiResourceResponse<Team>;
type TeamsShowRequestData = undefined;

type TeamsCreateResponse = ApiResourceResponse<Team>;
type TeamsCreateRequestData = Pick<Team, 'name', 'description'>;

type TeamsUpdateResponse = ApiResourceResponse<Team>;
type TeamsUpdateRequestData = Pick<Team, 'name', 'description'>;

type TeamsDeleteResponse = ApiResourceResponse<undefined>;
type TeamsDeleteRequestData = undefined;
