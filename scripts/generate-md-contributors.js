import chalk from 'chalk';
import m from 'mdast-builder';
import {headingRange} from 'mdast-util-heading-range';
import {readFileSync, writeFileSync} from 'node:fs';
import {createRequire} from 'node:module';
import remarkGfm from 'remark-gfm';
import remarkParse from 'remark-parse';
import remarkStringify from 'remark-stringify';
import {unified} from 'unified';
import {getContributors} from './utils/getContributors.js';
import {writeContributorsAvatar} from './utils/writeContributorsAvatar.js';

const require = createRequire(import.meta.url);

const md = readFileSync(require.resolve('../README.md'), 'utf8');

(async () => {
  await writeContributorsAvatar();
  const file = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(() => async (tree, file, next) => {
      const contributors = await getContributors();
      headingRange(tree, 'Contributors', (start, nodes, end) => [
        start,
        m.table('center', [
          m.tableRow(contributors.map(c => m.tableCell(m.text(c.login)))),
          m.tableRow(
            contributors.map(c =>
              m.tableCell(
                m.link(
                  c.html_url,
                  c.login,
                  m.image(
                    `./static/contributors/${c.login}.svg`,
                    c.login,
                    c.login
                  )
                )
              )
            )
          )
        ]),
        end
      ]);
      next();
    })
    .use(remarkStringify)
    .process(md);

  const result = String(file);

  writeFileSync(require.resolve('../README.md'), result, 'utf8');

  console.log(
    chalk.green('📄 Contributors added:'),
    chalk.bgGreen(`${require.resolve('../README.md')}`)
  );
})();
