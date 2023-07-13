// import devHosts from 'configs/hosts.json';
import { Express } from 'express';
// import { readFileSync } from 'fs';
import https from 'https';
// import { homedir } from 'os';
// import { resolve } from 'path';
import Loadable from 'react-loadable';
//@ts-ignore
import selfSigned from 'openssl-self-signed-certificate';
import { findIP } from './findIp';

const devHosts = [
  {
    host: 'my-app.localhost.ya-praktikum.tech',
    ip: '10.0.2.2',
  },
];

export function makeStartLogsText(
  hosts: string[],
  protocol = 'https',
  port: number | string | undefined
) {
  return `
Running on:
${hosts.map((host) => `   * ${protocol}://${host}:${port}`).join('\n')}
`;
}

interface Options {
  server: Express;
}

const { PORT = 3000, NODE_ENV } = process.env;
const isDev = NODE_ENV === 'development';

const APP_HOSTS = ['10.0.2.2'];

if (isDev) {
  const devLocalIP = findIP();
  if (devLocalIP) {
    APP_HOSTS.push(devLocalIP);
  }
}

export function startApp({ server }: Options) {
  Loadable.preloadAll().then(() => {
    if (isDev) {
      https
        .createServer({ key: selfSigned.key, cert: selfSigned.cert }, server)
        // eslint-disable-next-line prettier/prettier
        //@ts-ignore
        .listen(PORT, '0.0.0.0', () => {
          console.info(
            makeStartLogsText(
              APP_HOSTS.concat(...devHosts.map(({ host }) => host)),
              'https',
              PORT
            )
          );
        });
      return;
    }

    server.listen(PORT, () => {
      console.info(makeStartLogsText(APP_HOSTS, 'http', PORT));
    });
  });
}
