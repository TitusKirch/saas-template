type UserData = {
  id: number;
  name: string;
  email: string;
  email_verified_at: string | null;
  created_at: string;
  updated_at: string;
};
type UserResponse = ApiResourceResponse<UserData>;

type User = Omit<UserData, 'email_verified_at' | 'created_at' | 'updated_at'> & {
  email_verified_at: Date | null;
  createdAt: Date;
  updatedAt: Date;
};
