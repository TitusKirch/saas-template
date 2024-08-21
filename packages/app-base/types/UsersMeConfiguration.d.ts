type UserMeConfigurationData = undefined;
type UserMeConfigurationResponse = ApiResourceResponse<UserConfiguration[]>;

// type UpdateUserMeData = Pick<UserMe, 'first_name' | 'last_name' | 'email'> & {
//   password?: string;
//   password_confirmation?: string;
// };
// type UpdateUserMeResponse = ApiResourceResponse<UpdateUserMeData>;

// type UserMeAvatarData = undefined;
// type UserMeAvatarResponse = ApiPresignedUrlResponse;

// type UserMeAvatarPresignedUploadData = FormData;
// type UserMeAvatarPresignedUploadResponse = ApiConfirmablePresignedUrlResponse;

// type UserMeUpdateAvatarData = undefined;
// type UserMeUpdateAvatarResponse = ApiResourceResponse<UserMeUpdateAvatarData>;

type UsersMeConfigurationSetResponse = ApiResourceResponse<UserConfiguration[]>;
type UsersMeConfigurationSetRequestData = UserConfigurationVariant[];
