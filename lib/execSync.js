import child_process from 'node:child_process';
import {arch} from 'node:os';

const isPlatform32 =
  process.platform === 'win32' || ['ia32', 'x64'].includes(arch());

/**
 * @param {string} command
 * @param {child_process.SpawnSyncOptionsWithStringEncoding} options
 *  */
export function execSync(command, options) {
  if (!command) return;

  child_process.spawnSync(command.split(' ')[0], command.split(' ').slice(1), {
    stdio: 'inherit',
    shell: isPlatform32,
    ...options
  });
}
