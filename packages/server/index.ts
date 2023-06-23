import dotenv from 'dotenv';
import cors from 'cors';
import { createServer as createViteServer } from 'vite';
import type { ViteDevServer } from 'vite';
import express from 'express';
import fs from 'node:fs';
import path from 'node:path';
import cookieParser from 'cookie-parser';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { appRoutes } from './ssrRoutes';
import { requireAuth } from './app/requireAuth';
import { Message, Topic, User } from './models';
import sequelize from './app/sequelize';
import bodyParser from 'body-parser';

dotenv.config();
const isDev = () => process.env.NODE_ENV === 'development';
const port = Number(process.env.SERVER_PORT) || 3001;
const root = 'https://ya-praktikum.tech';
const base = '/api/v2';

async function startServer() {
  const app = express();

  app.use(cors());
  //@ts-ignore
  app.use(cookieParser());

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));

  const apiProxy = createProxyMiddleware(base, {
    target: root,
    changeOrigin: true,
    cookieDomainRewrite: 'localhost',
  });

  const apiRouter = express.Router();

  apiRouter.all(`${base}/*`, apiProxy);
  app.use(apiRouter);
  //Роутер для пользователей
  app.get('/api/users', requireAuth, async (_, res) => {
    const users = await User.findAll();
    res.json(users);
  });

  app.post('/api/users', requireAuth, async (req, res) => {
    try {
      const user = await User.create(req.body);
      res.json(user);
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  });

  app.get('/api/users/:id', requireAuth, async (req, res) => {
    const user = await User.findByPk(req.params.id);
    res.json(user);
  });

  app.put('/api/users/:id', requireAuth, async (req, res) => {
    try {
      const user = await User.findByPk(req.params.id);
      if (user) {
        await user.update(req.body);
        res.json(user);
      } else {
        res.sendStatus(404);
      }
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  });

  app.delete('/api/users/:id', requireAuth, async (req, res) => {
    try {
      const user = await User.findByPk(req.params.id);
      if (user) {
        await user.destroy();
        res.sendStatus(204);
      } else {
        res.sendStatus(404);
      }
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  });

  // Роутер для тем форума
  app.get('/api/topics', requireAuth, async (_, res) => {
    const topics = await Topic.findAll();
    res.json(topics);
  });

  app.post('/api/topics', requireAuth, async (req, res) => {
    try {
      const topic = await Topic.create(req.body);
      res.json(topic);
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  });

  app.get('/api/topics/:id', requireAuth, async (req, res) => {
    const topic = await Topic.findByPk(req.params.id, {
      include: [User, Message],
    });
    res.json(topic);
  });

  app.put('/api/topics/:id', requireAuth, async (req, res) => {
    try {
      const topic = await Topic.findByPk(req.params.id);
      if (topic) {
        await topic.update(req.body);
        res.json(topic);
      } else {
        res.sendStatus(404);
      }
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  });

  app.delete('/api/topics/:id', requireAuth, async (req, res) => {
    const topic = await Topic.findByPk(req.params.id);
    if (topic) {
      await topic.destroy();
      res.sendStatus(204);
    } else {
      res.sendStatus(404);
    }
  });

  // Роутер для сообщений на форуме
  app.get('/api/messages', requireAuth, async (_, res) => {
    const messages = await Message.findAll();
    res.json(messages);
  });

  app.post('/api/messages', requireAuth, async (req, res) => {
    console.log(req);
    try {
      const message = await Message.create(req.body);
      res.json(message);
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  });

  app.get('/api/messages/:id', requireAuth, async (req, res) => {
    const message = await Message.findByPk(req.params.id, {
      include: [User, Topic],
    });
    res.json(message);
  });

  app.put('/api/messages/:id', requireAuth, async (req, res) => {
    try {
      const message = await Message.findByPk(req.params.id);
      if (message) {
        await message.update(req.body);
        res.json(message);
      } else {
        res.sendStatus(404);
      }
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  });

  app.delete('/messages/:id', requireAuth, async (req, res) => {
    try {
      const message = await Message.findByPk(req.params.id);
      if (message) {
        await message.destroy();
        res.sendStatus(204);
      } else {
        res.sendStatus(404);
      }
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  });

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
  if (!isDev()) {
    app.use(`/assets`, express.static(path.resolve(distPath, 'assets')));
  }
  app.use(appRoutes, async (req, res, next) => {
    const url = req.originalUrl;

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
      let render: (url: string, cookie?: string) => Promise<string>;

      if (!isDev()) {
        render = (await import(ssrClientPath)).render;
      } else {
        const ssrLoadModule = await vite!.ssrLoadModule(
          path.resolve(srcPath, 'src/entry-server.tsx')
        );
        render = ssrLoadModule.render;
      }
      const cookie = req.headers?.cookie ?? undefined;
      const [appHtml, preloadedState] = await render(url, cookie);
      console.log(preloadedState);

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

  (async () => {
    try {
      await sequelize.authenticate();
      console.log('Connection has been established successfully.');

      await sequelize.sync({ force: true });

      console.log('Tables created successfully.');
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
  })();

  app.listen(port, () => {
    console.log(`  ➜ 🎸 Server is listening on port: ${port}`);
  });
}

startServer();
