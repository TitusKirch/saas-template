import type { Config } from 'tailwindcss';

import { join } from 'path';

const currentDir = '../../packages/app-base';

export default <Partial<Config>>{
  content: [join(currentDir, './formkitBaseTheme.ts'), join(currentDir, './formkitTheme.ts')],
};
