import type { Config } from 'tailwindcss'
import colors from 'tailwindcss/colors'

export default <Partial<Config>>{
  // content: [
  //   '../../packages/app-base/formkitBaseTheme.ts',
  //   '../../packages/app-base/formkitTheme.ts',
  // ],
  theme: {
    extend: {
      colors: {
        primary: colors.sky,
        muted: colors.slate,
        // info: colors.cyan,
        // success: colors.teal,
        // warning: colors.orange,
        // danger: colors.red,
      },
    },
  },
}
