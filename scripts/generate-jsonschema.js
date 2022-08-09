import chalk from 'chalk';
import {writeFileSync} from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import * as TJS from 'typescript-json-schema';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const program = TJS.getProgramFromFiles([
  path.resolve(__dirname, '../lib/types.d.ts')
]);

const schema = TJS.generateSchema(program, 'UserConfig', {required: true});

const filename = path.join(__dirname, '../lib', 'schema.json')

writeFileSync(filename, JSON.stringify(schema, null, 2));

console.log(chalk.green('📄 Schema file generated:'), chalk.bgGreen(`${filename}`))
