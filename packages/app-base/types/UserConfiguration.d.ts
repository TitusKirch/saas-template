type UserConfigurationContext = 'table';

type UserConfigurationValue =
  | string
  | number
  | boolean
  | null
  | UserConfigurationValueObject
  | UserConfigurationValueArray;

type UserConfigurationValueObject = {
  [key: string]: UserConfigurationValue;
};

type UserConfigurationValueArray = UserConfigurationValue[];

type UserConfiguration = {
  id: BigInt;
  context: UserConfigurationContext;
  key: string;
  value: UserConfigurationValueObject | UserConfigurationValueArray;
  created_at: Date;
  updated_at: Date;
};

type UserConfigurationPartial = Omit<UserConfiguration, 'id' | 'created_at' | 'updated_at'>;

type UserConfigurationVariant = UserConfiguration | UserConfigurationPartial;
