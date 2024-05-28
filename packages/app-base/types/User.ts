type UserData = {
  id: number;
  name: string;
  email: string;
  created_at: string;
  updated_at: string;
};
type UserResponse = ApiResourceResponse<UserData>;

type User = Omit<UserData, 'created_at' | 'updated_at'> & {
  createdAt: Date;
  updatedAt: Date;
};
