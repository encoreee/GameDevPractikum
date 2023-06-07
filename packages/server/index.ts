import dotenv from 'dotenv';
import cors from 'cors';
import { createServer as createViteServer } from 'vite';
import type { ViteDevServer } from 'vite';
import express from 'express';
import fs from 'node:fs';
import path from 'node:path';

dotenv.config();

const port = Number(process.env.SERVER_PORT) || 3001;

const isDev = process.env.NODE_ENV === 'development';

async function startServer() {
  const app = express();

  app.use(cors());

  let vite: ViteDevServer | undefined;
  /**
   * path to link `client` in `node_modules`
   * if `client` is not defined try remake link.
   * cd ./packages/client && yarn link
   * cd ../server && yarn link client
   */
  let distPath: string | undefined;
  let ssrClientPath: string | undefined;

  if (!isDev) {
    distPath = path.dirname(require.resolve('client/dist/index.html'));
    ssrClientPath = require.resolve('client/dist-ssr/entry-server.cjs');
  }
  const srcPath = path.dirname(require.resolve('client'));

  // vite milleware if dev mode
  if (isDev) {
    vite = await createViteServer({
      server: { middlewareMode: true },
      root: srcPath,
      appType: 'custom',
    });
    app.use(vite.middlewares);
  }
  // api route
  app.get('/api', (_, res) => {
    res.json('👋 Howdy from the server :)');
  });

  // static
  if (!isDev && !!distPath) {
    app.use(`/assets`, express.static(path.resolve(distPath, 'assets')));
  }

  // ssr
  app.use('*', async (req, res, next) => {
    const url = req.originalUrl;
    try {
      let template: string;
      if (!isDev && !!distPath) {
        template = fs.readFileSync(
          path.resolve(distPath, 'index.html'),
          'utf-8'
        );
      } else {
        template = fs.readFileSync(
          path.resolve(srcPath, 'index.html'),
          'utf-8'
        );
        if (vite) {
          template = await vite.transformIndexHtml(url, template);
        }
      }
      let render: () => Promise<string>;
      let preloadedStatePromise!: () => Promise<any>;
      if (!isDev && !!ssrClientPath) {
        render = (await import(ssrClientPath)).render;
        preloadedStatePromise = (await import(ssrClientPath)).getPreloadedState;
      } else if (vite) {
        const ssrLoadModule = await vite.ssrLoadModule(
          path.resolve(srcPath, 'src/entry-server.tsx')
        );
        render = ssrLoadModule.render;
        preloadedStatePromise = ssrLoadModule.getPreloadedState;
      } else {
        throw new Error(
          'render() cant be defined. SSR module couldnt be loaded'
        );
      }

      const appHtml = await render();
      const preloadedState = await preloadedStatePromise();
      const stateMarkup = `<script>window.__PRELOADED_STATE__ = ${JSON.stringify(
        preloadedState
      )}</script>`;
      const html = template.replace(
        `<!-- ssr-outlet -->`,
        stateMarkup + appHtml
      );
      res.status(200).end(html);
    } catch (e) {
      if (isDev && vite) {
        vite.ssrFixStacktrace(e as Error);
      }
      next(e);
    }
  });
  app.listen(port, () => {
    console.log(`  ➜ 🎸 Server is listening on port: ${port}`);
  });
}

startServer();
