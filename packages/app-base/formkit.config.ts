import { createAutoAnimatePlugin, createAutoHeightTextareaPlugin } from '@formkit/addons';
import { genesisIcons } from '@formkit/icons';
import { createProPlugin, inputs } from '@formkit/pro';
import { generateClasses } from '@formkit/themes';
import { defineFormKitConfig } from '@formkit/vue';
import { de, en } from '@formkit/i18n';

// NOTE: FA PRO
// import { fal } from '@fortawesome/pro-light-svg-icons';

import { rootClasses } from './formkitBaseTheme';
import { classes } from './formkitTheme';

// NOTE: FA PRO
// import type { IconDefinition } from '@fortawesome/fontawesome-common-types';

export default defineFormKitConfig(() => {
  // get runtime config
  const runtimeConfig = useRuntimeConfig();

  // setup plugins
  const plugins = [createAutoAnimatePlugin(), createAutoHeightTextareaPlugin()];

  // check if we have a pro key
  if (
    runtimeConfig.public?.formkitProKey &&
    typeof runtimeConfig.public?.formkitProKey === 'string'
  ) {
    // add pro plugin
    plugins.push(createProPlugin(runtimeConfig.public.formkitProKey, inputs));
  }

  // NOTE: FA PRO
  // helper to convert font awesome icons to svg
  // const fontAwesomeIconToSvg = (icon: IconDefinition) => {
  //   return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${icon.icon[0]} ${icon.icon[1]}" fill="currentColor"><path d="${icon.icon[4]}"/></svg>`;
  // };

  return {
    config: {
      rootClasses,
      classes: generateClasses(classes),
    },
    locales: {
      de,
      en,
    },
    locale: 'en',
    plugins,
    icons: {
      // fallback to formkit icons
      ...genesisIcons,

      // NOTE: FA PRO
      // override formkit icons with font awesome
      // select: fontAwesomeIconToSvg(fal.faChevronDown),
      // close: fontAwesomeIconToSvg(fal.faX),
    },
  };
});
