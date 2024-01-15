// eslint-disable-next-line import/no-extraneous-dependencies
const { v4: uuidv4 } = require('uuid');
const path = require('node:path');

const { parse, serialize } = require('../utils/json');

const jsonDbPath = path.join(__dirname, '/../data/messages.json');

function readAllMessages() {
  return parse(jsonDbPath, []);
}

function addMessage(message) {
  const messages = parse(jsonDbPath, []);

  const createdMessage = {
    id: uuidv4(),
    message,
  };

  messages.push(createdMessage);
  serialize(jsonDbPath, messages);
}

function modifyMessage(id, message) {
  const messages = parse(jsonDbPath, []);

  for (let i = 0; i < messages.length; i += 1) {
    if (messages[i].id === id) {
      messages[i].message = message;
      serialize(jsonDbPath, messages);
      return messages[i];
    }
  }
  return undefined;
}

function removeMessage(id) {
  const messages = parse(jsonDbPath, []);

  let removedMessage;

  for (let i = 0; i < messages.length; i += 1) {
    if (messages[i].id === id) {
      removedMessage = messages[i];
      messages.splice(i, 1);
      serialize(jsonDbPath, messages);
      return removedMessage;
    }
  }
  return undefined;
}

module.exports = {
  readAllMessages,
  addMessage,
  modifyMessage,
  removeMessage,
};
