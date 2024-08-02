type Team = {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
};

type TeamsResponse = ApiResourceResponse<Team[]>;
type TeamsRequestData = undefined;

type TeamsShowResponse = ApiResourceResponse<Team>;
type TeamsShowRequestData = undefined;

type TeamsCreateResponse = ApiResourceResponse<Team>;
type TeamsCreateRequestData = Pick<Team, 'name'>;

type TeamsUpdateResponse = ApiResourceResponse<Team>;
type TeamsUpdateRequestData = Pick<Team, 'name'>;

type TeamsDeleteResponse = ApiResourceResponse<undefined>;
type TeamsDeleteRequestData = undefined;
