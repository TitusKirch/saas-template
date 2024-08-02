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
