type UserConfigurationContext = 'table';

type UserConfiguration = {
  id: BigInt;
  context: UserConfigurationContext;
  key: string;
  value: JSON;
  created_at: Date;
  updated_at: Date;
};
