type UsersData = {
  id: number;
  first_name: string;
  last_name: string;
  avatar?: string;
  email: string;
  created_at: string;
  updated_at: string;
};
type UsersResponse = ApiResourceResponse<UsersData>;

type User = Omit<UsersData, 'created_at' | 'updated_at'> & {
  createdAt: Date;
  updatedAt: Date;
};

type UsersMeExtraData = {
  has_password: boolean;
  email_verified_at: string | null;
  two_factor_confirmed_at: Date | null;
  organizations: string[];
};
type UsersMeData = UsersData & UsersMeExtraData;
type UsersMeResponse = ApiResourceResponse<UsersMeData>;

type UsersMe = Users &
  Omit<UsersMeExtraData, 'email_verified_at' | 'two_factor_confirmed_at'> & {
    emailVerifiedAt: Date | null;
    twoFactorConfirmedAt: Date | null;
  };

type UpdateUsersMeData = {
  first_name?: string;
  last_name?: string;
  email?: string;
  password?: string;
  password_confirmation?: string;
};
type UpdateUsersMeResponse = ApiResourceResponse<UsersMeData>;

type UpdateUsersMeAvatarData = FormData;
type UpdateUsersMeAvatarResponse = ApiPresignedUrlResponse;

type StoreUsersMeAvatarData = undefined;
type StoreUsersMeAvatarResponse = ApiResourceResponse<StoreUsersMeAvatarData>;
