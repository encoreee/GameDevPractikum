import dotenv from 'dotenv';
import cors from 'cors';
import { createServer as createViteServer } from 'vite';
import type { ViteDevServer } from 'vite';
import express from 'express';
import fs from 'node:fs';
import path from 'node:path';

dotenv.config();
const isDev = () => process.env.NODE_ENV === 'development';

async function startServer() {
  const app = express();
  app.use(cors());
  const port = Number(process.env.SERVER_PORT) || 3001;
  let vite: ViteDevServer | undefined;
  const distPath = path.dirname(require.resolve('client/dist/index.html'));
  const srcPath = path.dirname(require.resolve('client'));
  const ssrClientPath = require.resolve('client/dist-ssr/client.cjs');
  if (isDev()) {
    vite = await createViteServer({
      server: { middlewareMode: true },
      root: srcPath,
      appType: 'custom',
    });
    app.use(vite.middlewares);
  }
  app.get('/api', (_, res) => {
    res.json('👋 Howdy from the server :)');
  });
  if (!isDev()) {
    app.use(`/assets`, express.static(path.resolve(distPath, 'assets')));
  }
  app.use('*', async (req, res, next) => {
    const url = req.originalUrl;
    console.log(
      'incoming request this is from the server',
      req?.headers,
      req.originalUrl,
      req
    );
    try {
      let template: string;
      if (!isDev()) {
        template = fs.readFileSync(
          path.resolve(distPath, 'index.html'),
          'utf-8'
        );
      } else {
        template = fs.readFileSync(
          path.resolve(srcPath, 'index.html'),
          'utf-8'
        );
        template = await vite!.transformIndexHtml(url, template);
      }
      let render: () => Promise<string>;
      let preloadedStatePromise!: () => Promise<any>;
      if (!isDev()) {
        render = (await import(ssrClientPath)).render;
        preloadedStatePromise = (await import(ssrClientPath)).getPreloadedState;
      } else {
        const ssrLoadModule = await vite!.ssrLoadModule(
          path.resolve(srcPath, 'src/entry-server.tsx')
        );
        render = ssrLoadModule.render;
        preloadedStatePromise = ssrLoadModule.getPreloadedState;
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
      if (isDev()) {
        vite!.ssrFixStacktrace(e as Error);
      }
      next(e);
    }
  });
  app.listen(port, () => {
    console.log(`  ➜ 🎸 Server is listening on port: ${port}`);
  });
}

startServer();
