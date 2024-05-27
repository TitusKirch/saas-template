import type { Config } from 'tailwindcss';

import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const currentDir = dirname(fileURLToPath(import.meta.url));

export default <Partial<Config>>{
  content: [join(currentDir, './formkitBaseTheme.ts'), join(currentDir, './formkitTheme.ts')],
};
