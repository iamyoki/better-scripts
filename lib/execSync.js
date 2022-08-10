import child_process from 'node:child_process';

/**
 * @param {string} command
 * @param {child_process.SpawnSyncOptionsWithStringEncoding} options
 *  */
export function execSync(command, options) {
  if (!command) return;

  child_process.spawnSync(command.split(' ')[0], command.split(' ').slice(1), {
    stdio: 'inherit',
    shell: true,
    ...options
  });
}
