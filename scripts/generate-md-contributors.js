import chalk from 'chalk';
import m from 'mdast-builder';
import { readFileSync, writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import remarkParse from 'remark-parse';
import remarkStringify from 'remark-stringify';
import { unified } from 'unified';
import { visit } from 'unist-util-visit';
import { getContributors } from './utils/getContributors.js';

const require = createRequire(import.meta.url);

const md = readFileSync(require.resolve('../README.md'), 'utf8');

(async () => {
  const file = await unified()
    .use(remarkParse)
    .use(() => (tree, file, next) => {
      visit(tree, (node, index, root) => {
        if (
          node.type === 'heading' &&
          node.children[0].value.includes('Contributors')
        ) {
          getContributors().then(contributors => {
            root.children.splice(
              index + 1,
              0,
              ...contributors.map(c =>
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
            );
            // root.children.push(

            // );
            next();
          });
        }
      });
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
