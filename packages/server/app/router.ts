import express from 'express';
import { User, Topic, Message } from '../models';

const router = express.Router();

// Роутер для пользователей
router.get('/users', async (_, res) => {
  const users = await User.findAll();
  res.json(users);
});

router.post('/users', async (req, res) => {
  const user = await User.create(req.body);
  res.json(user);
});

router.get('/users/:id', async (req, res) => {
  const user = await User.findByPk(req.params.id);
  res.json(user);
});

router.put('/users/:id', async (req, res) => {
  const user = await User.findByPk(req.params.id);
  if (user) {
    await user.update(req.body);
    res.json(user);
  } else {
    res.sendStatus(404);
  }
});

router.delete('/users/:id', async (req, res) => {
  const user = await User.findByPk(req.params.id);
  if (user) {
    await user.destroy();
    res.sendStatus(204);
  } else {
    res.sendStatus(404);
  }
});

// Роутер для тем форума
router.get('/topics', async (_, res) => {
  const topics = await Topic.findAll();
  res.json(topics);
});

router.post('/topics', async (req, res) => {
  const topic = await Topic.create(req.body);
  res.json(topic);
});

router.get('/topics/:id', async (req, res) => {
  const topic = await Topic.findByPk(req.params.id, {
    include: [User, Message],
  });
  res.json(topic);
});

router.put('/topics/:id', async (req, res) => {
  const topic = await Topic.findByPk(req.params.id);
  if (topic) {
    await topic.update(req.body);
    res.json(topic);
  } else {
    res.sendStatus(404);
  }
});

router.delete('/topics/:id', async (req, res) => {
  const topic = await Topic.findByPk(req.params.id);
  if (topic) {
    await topic.destroy();
    res.sendStatus(204);
  } else {
    res.sendStatus(404);
  }
});

// Роутер для сообщений на форуме
router.get('/messages', async (_, res) => {
  const messages = await Message.findAll();
  res.json(messages);
});

router.post('/messages', async (req, res) => {
  const message = await Message.create(req.body);
  res.json(message);
});

router.get('/messages/:id', async (req, res) => {
  const message = await Message.findByPk(req.params.id, {
    include: [User, Topic],
  });
  res.json(message);
});

router.put('/messages/:id', async (req, res) => {
  const message = await Message.findByPk(req.params.id);
  if (message) {
    await message.update(req.body);
    res.json(message);
  } else {
    res.sendStatus(404);
  }
});

router.delete('/messages/:id', async (req, res) => {
  const message = await Message.findByPk(req.params.id);
  if (message) {
    await message.destroy();
    res.sendStatus(204);
  } else {
    res.sendStatus(404);
  }
});

export default router;
