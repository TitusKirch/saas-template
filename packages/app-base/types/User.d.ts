type UserData = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  created_at: string;
  updated_at: string;
};
type UserResponse = ApiResourceResponse<UserData>;

type User = Omit<UserData, 'created_at' | 'updated_at'> & {
  createdAt: Date;
  updatedAt: Date;
};

type UserMeExtraData = {
  email_verified_at: string | null;
  organizations: string[];
};
type UserMeData = UserData & UserMeExtraData;
type UserMeResponse = ApiResourceResponse<UserMeData>;

type UserMe = User &
  Omit<UserMeExtraData, 'email_verified_at'> & {
    emailVerifiedAt: Date | null;
  };

type UpdateUserMeForm = {
  first_name?: string;
  last_name?: string;
  email?: string;
  password?: string;
  password_confirm?: string;
};
type UpdateUserMeData = Omit<UpdateUserMeForm, 'password_confirm'> & {
  password_confirmation?: string;
};
type UpdateUserMeResponse = ApiResourceResponse<UserMeData>;
