import {cosmiconfig} from 'cosmiconfig';
import {getPkg} from './getPkg.js';
import {getUserPkg} from './getUserPkg.js';

const moduleName = getPkg().name;
const explorer = cosmiconfig(moduleName, {
  packageProp: 'better-scripts',
  searchPlaces: [
    'package.json',
    'scripts.json',
    `${moduleName}.json`,
    `.${moduleName}rc`,
    `.${moduleName}rc.json`,
    `.${moduleName}rc.yaml`,
    `.${moduleName}rc.yml`,
    `.${moduleName}rc.js`,
    `.${moduleName}rc.cjs`,
    `${moduleName}.config.js`,
    `${moduleName}.config.cjs`
  ]
});

/** Get user config object (haven't parsed yet)
 * @param {string} configPath Custom specified config path
 * @returns {Promise<import('./types').UserConfig>}
 */
export async function getUserConfig(configPath) {
  const result = await (configPath
    ? explorer.load(configPath).catch(() => {
        throw new Error(`Config file "${configPath}" doesn't exist`);
      })
    : explorer.search());

  const userPkg = getUserPkg();

  // falsy
  if (!result?.config && !userPkg?.scripts) {
    throw new Error(
      'Config validation failed, you probably forgot to write ”better-scripts“ in package.json or "scripts.json" config file'
    );
  }

  // empty
  if (
    result &&
    (result?.isEmpty || !Object.keys(result.config).length) &&
    !userPkg?.scripts
  ) {
    throw new Error('Config validation failed, your config is empty');
  }

  return result?.config ?? userPkg.scripts;
}
