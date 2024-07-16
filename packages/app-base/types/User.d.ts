type User = {
  id: number;
  first_name: string;
  last_name: string;
  avatar?: string;
};
type UsersResponse = ApiResourceResponse<User>;
