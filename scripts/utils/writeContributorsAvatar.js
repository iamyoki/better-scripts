import {existsSync, mkdirSync, writeFileSync} from 'node:fs';
import path, {dirname} from 'node:path';
import {fileURLToPath} from 'node:url';
import {getContributors} from './getContributors.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const dirpath = path.resolve(__dirname, '../../static/contributors');

if (!existsSync(dirpath)) {
  mkdirSync(dirpath);
}

export function writeContributorsAvatar() {
  return getContributors().then(contributors => {
    contributors.map(c => {
      const {base64, login} = c;
      writeFileSync(
        path.resolve(dirpath, `${login}.svg`),
        `<svg
      width="80"
      height="80"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
    >
      <rect id="bg" width="100%" height="100%" rx="12" ry="12" fill="white" />
      <clipPath id="clip">
        <use xlink:href="#bg" />
      </clipPath>
      <image
        xlink:href="${base64}"
        x="0"
        y="0"
        clip-path="url(#clip)"
        preserveAspectRatio="xMidYMid slice"
        height="100%"
        width="100%"
      />
      <rect width="100" height="30%" y="70%" clip-path="url(#clip)" fill="url(#textGradient)" opacity=".6" />
      <defs>
        <linearGradient id="textGradient">
          <stop offset="0%" stop-color="#ef41e0" />
          <stop offset="70%" stop-color="#105bfc" />
        </linearGradient>
      </defs>
      <text
        x="50%"
        y="85%"
        font-size="13"
        text-anchor="middle"
        dominant-baseline="middle"
        font-weight="bold"
        font-family="PingFangSC, Myriad Pro, -apple-system, BlinkMacSystemFont,
          'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans',
          'Helvetica Neue', sans-serif"
        fill="white"
      >
        ${login}
      </text>
    </svg>
    `
      );
    });
  });
}
