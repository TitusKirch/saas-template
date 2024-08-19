type UserConfigurationContext = 'table';

type UserConfigurationValueTable = {
  columns?: string[];
  rowsPerPage?: number;
  sort?: {
    column: string;
    direction?: 'asc' | 'desc';
  };
};

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

type UserConfiguration = (
  | {
      context: 'table';
      value: UserConfigurationValueTable;
    }
  | {
      context: undefined;
      value: UserConfigurationValueObject | UserConfigurationValueArray;
    }
) & {
  id: BigInt;
  context: string;
  key: string;
  created_at: Date;
  updated_at: Date;
};

type UserConfigurationPartial = Omit<UserConfiguration, 'id' | 'created_at' | 'updated_at'>;

type UserConfigurationVariant = UserConfiguration | UserConfigurationPartial;
