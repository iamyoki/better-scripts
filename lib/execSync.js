import child_process from 'node:child_process';

/**@param {string} command */
export function execSync(command) {
  if (!command) return;

  child_process.spawnSync(command.split(' ')[0], command.split(' ').slice(1), {
    stdio: 'inherit',
    shell: true
  });
}
