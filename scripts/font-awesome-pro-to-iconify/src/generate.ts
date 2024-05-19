import fs from 'fs';
import path from 'path';

import { cleanupSVG, importDirectory, isEmptyColor, parseColors, runSVGO } from '@iconify/tools';

import type { IconifyInfo } from '@iconify/types';

// get fontawesome pro directory
const fontAwesomeProDirectory = fs
  .readdirSync(path.join(__dirname, '..'))
  .find((folder) => folder.match(/fontawesome-pro-\d+\.\d+\.\d+-web/));

console.log(`Found Font Awesome Pro directory: ${fontAwesomeProDirectory}`);

// set fontawesome themes
const fontawesomeThemes = ['brands', 'duotone', 'light', 'regular', 'solid'];

// set output directory
const outputDirectory = path.resolve(__dirname, '../output');

// set base information
const baseInfo: IconifyInfo = {
  name: 'Font Awesome',
  author: {
    name: 'Font Awesome',
  },
  license: {
    title: 'Commercial License',
    url: 'https://fontawesome.com/license',
  },
  height: 32,
};

// set base prefix (without theme)
const basePrefix = 'fa-pro-';

// main function
const main = async () => {
  // Parse all configured themes
  for (let i = 0; i < fontawesomeThemes.length; i++) {
    const fontawesomeTheme = fontawesomeThemes[i];
    const source = fontAwesomeProDirectory + '/svgs/' + fontawesomeTheme;
    const fontawesomeThemePrefix = basePrefix + fontawesomeTheme;

    // Import icons
    const iconSet = await importDirectory(source, {
      prefix: fontawesomeThemePrefix,
    });

    // Set info
    const info: IconifyInfo = JSON.parse(JSON.stringify(baseInfo));
    const themeName = fontawesomeTheme.toUpperCase().slice(0, 1) + fontawesomeTheme.slice(1);
    info.name += ' ' + themeName;
    iconSet.info = info;

    // Validate, clean up, fix palette and optimise
    await iconSet.forEach(async (name, type) => {
      if (type !== 'icon') {
        return;
      }

      // Get SVG instance for parsing
      const svg = iconSet.toSVG(name);
      if (!svg) {
        // Invalid icon
        iconSet.remove(name);
        return;
      }

      // Clean up and optimise icons
      try {
        // Clean up icon code
        await cleanupSVG(svg);

        // Replace color with currentColor, add if missing
        await parseColors(svg, {
          defaultColor: 'currentColor',
          callback: (attr, colorStr, color) => {
            return !color || isEmptyColor(color) ? colorStr : 'currentColor';
          },
        });

        // Optimise
        await runSVGO(svg);
      } catch (err) {
        // Invalid icon
        console.error(`Error parsing ${name}:`, err);
        iconSet.remove(name);
        return;
      }

      // Update icon from SVG instance
      iconSet.fromSVG(name, svg);
    });
    console.log(`Imported ${iconSet.count()} icons for ${info.name}`);

    // Export to IconifyJSON, convert to string
    const output = JSON.stringify(iconSet.export(), null, '\t');

    // Save to file
    const target = outputDirectory + '/' + fontawesomeThemePrefix + '.json';
    await fs.writeFile(target, output, 'utf8', (err) => {
      if (err) {
        console.error(`Error saving ${target}:`, err);
      } else {
        console.log(`Saved ${target} (${output.length} bytes)`);
      }
    });
  }

  // create index.ts in output directory (with export { default as faPro<Theme> } from './fa-pro-<theme>.json')
  const indexFile = outputDirectory + '/index.ts';
  let indexFileContent = '';
  fontawesomeThemes.forEach((fontawesomeTheme) => {
    const fontawesomeThemePrefix = basePrefix + fontawesomeTheme;
    const themeName = fontawesomeTheme.toUpperCase().slice(0, 1) + fontawesomeTheme.slice(1);

    indexFileContent += `export { default as faPro${themeName} } from './${fontawesomeThemePrefix}.json';\n`;
  });

  // save to file
  await fs.writeFile(indexFile, indexFileContent, 'utf8', (err) => {
    if (err) {
      console.error(`Error saving ${indexFile}:`, err);
    } else {
      console.log(`Saved ${indexFile} (${indexFileContent.length} bytes)`);
    }
  });
};

// run main function
main();
