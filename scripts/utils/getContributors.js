import https from 'node:https';
import {getImageBase64} from './getImageBase64.js';

const CONTRIBUTOR_API_URL =
  'https://api.github.com/repos/iamyoki/better-scripts/contributors';

export function getContributors() {
  return new Promise(resolve => {
    https.get(
      CONTRIBUTOR_API_URL,
      {
        headers: {
          'User-Agent': 'https://api.github.com/meta'
        }
      },
      res => {
        let data = '';
        res.setEncoding('utf8');
        res.on('data', chunk => {
          data += chunk;
        });
        res.on('end', async () => {
          const constributors = JSON.parse(data);
          const result = await Promise.all(
            constributors.map(async c => {
              const base64 = await getImageBase64(c.avatar_url + '&s=80');
              return {
                base64,
                ...c
              };
            })
          );
          resolve(result);
        });
      }
    );
  });
}
