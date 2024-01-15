const express = require('express');
const {
  readAllMessages,
  addMessage,
  modifyMessage,
  removeMessage,
} = require('../models/messages');
const { authorize, isAdmin } = require('../utils/auths');

const router = express.Router();

router.get('/all', (req, res) => {
  const messages = readAllMessages();
  return res.json(messages);
});

router.post('/add', authorize, isAdmin, (req, res) => {
  const message = req?.body?.message.length !== 0 ? req.body.message : undefined;

  if (!message) return res.sendStatus(400);

  const createdMessage = addMessage(message);

  return res.json(createdMessage);
});

router.patch('/modify/:id', authorize, isAdmin, (req, res) => {
  const id = req?.params?.id?.length !== 0 ? req.params.id : undefined;

  const message = req?.body?.message?.length !== 0 ? req.body.message : undefined;
  if (!id || !message) return res.sendStatus(400);
  const modifiedMessage = modifyMessage(id, message);
  if (!modifiedMessage) return res.sendStatus(404);

  return res.json(modifiedMessage);
});

router.delete('/remove/:id', authorize, isAdmin, (req, res) => {
  const id = req?.params?.id.length !== 0 ? req.params.id : undefined;

  if (!id) return res.sendStatus(400);

  const removedMessage = removeMessage(id);
  if (!removedMessage) return res.sendStatus(404);

  return res.sendStatus(200);
});

module.exports = router;
