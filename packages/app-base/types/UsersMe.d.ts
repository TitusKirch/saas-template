type UserMe = User & {
  email: string;
  email_verified_at: string | null;
  has_password: boolean;
  two_factor_confirmed_at: Date | null;
  teams: string[];
  created_at: Date;
  updated_at: Date;
};
type UserMeData = undefined;
type UserMeResponse = ApiResourceResponse<UserMe>;

type UpdateUserMeData = Pick<UserMe, 'first_name' | 'last_name' | 'email'> & {
  password?: string;
  password_confirmation?: string;
};
type UpdateUserMeResponse = ApiResourceResponse<UpdateUserMeData>;

type UserMeAvatarData = undefined;
type UserMeAvatarResponse = ApiPresignedUrlResponse;

type UserMeAvatarPresignedUploadData = FormData;
type UserMeAvatarPresignedUploadResponse = ApiConfirmablePresignedUrlResponse;

type UserMeUpdateAvatarData = undefined;
type UserMeUpdateAvatarResponse = ApiResourceResponse<UserMeUpdateAvatarData>;
