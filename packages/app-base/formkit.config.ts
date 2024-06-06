import {
  createAutoAnimatePlugin,
  createAutoHeightTextareaPlugin,
  createMultiStepPlugin,
} from '@formkit/addons';
import { genesisIcons } from '@formkit/icons';
import { createProPlugin, inputs } from '@formkit/pro';
import { generateClasses } from '@formkit/themes';
import { defineFormKitConfig } from '@formkit/vue';
import { de, en } from '@formkit/i18n';

// NOTE: FA PRO
// import { fal } from '@fortawesome/pro-light-svg-icons';

import { rootClasses } from './formkitBaseTheme';
import { classes } from './formkitTheme';
import type { FormKitNode } from '@formkit/core';

// NOTE: FA PRO
// import type { IconDefinition } from '@fortawesome/fontawesome-common-types';

const legends = ['checkbox_multi', 'radio_multi', 'repeater', 'transferlist'];
function addAsteriskPlugin(node: FormKitNode) {
  if (['button', 'submit', 'hidden', 'group', 'list', 'meta'].includes(node.props.type)) return;

  node.on('created', () => {
    const legendOrLabel = legends.includes(
      `${node.props.type}${node.props.options ? '_multi' : ''}`
    )
      ? 'legend'
      : 'label';

    if (node.props.definition?.schemaMemoKey) {
      node.props.definition.schemaMemoKey += `${node.props.options ? '_multi' : ''}_add_asterisk`;
    }

    if (!node.props.definition?.schema || typeof node.props.definition.schema !== 'function') {
      return;
    }

    const schemaFn = node.props.definition.schema;
    node.props.definition.schema = (sectionsSchema = {}) => {
      sectionsSchema[legendOrLabel] = {
        children: [
          '$label',
          {
            $el: 'span',
            if: '$state.required',
            attrs: {
              class: 'text-red-500 dark:text-red-400',
            },
            children: ['*'],
          },
        ],
      };

      return schemaFn(sectionsSchema);
    };
  });
}

export default defineFormKitConfig(() => {
  // get runtime config
  const runtimeConfig = useRuntimeConfig();

  // setup plugins
  const plugins = [
    createAutoAnimatePlugin(),
    createAutoHeightTextareaPlugin(),
    createMultiStepPlugin(),
    addAsteriskPlugin,
  ];

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
      // email: fontAwesomeIconToSvg(fal.faEnvelope),
      // password: fontAwesomeIconToSvg(fal.faLock),
      // eye: fontAwesomeIconToSvg(fal.faEye),
      // eyeClosed: fontAwesomeIconToSvg(fal.faEyeSlash),
      // people: fontAwesomeIconToSvg(fal.faUser), (change to user)
    },
  };
});
