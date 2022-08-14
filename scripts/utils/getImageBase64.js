import https from 'node:https';

export function getImageBase64(url) {
  return new Promise(resolve => {
    https.get(url, res => {
      let data = '';

      res.setEncoding('base64');

      res.on('data', chunk => {
        data += chunk;
      });

      res.on('end', () => {
        resolve(`data:${res.headers['content-type']};base64,${data}`);
      });
    });
  });
}
