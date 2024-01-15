const express = require('express');

const router = express.Router();

const tab = 'test';

/* GET users listing. */
router.get('/', (req, res) => {
  res.json(tab);
});

/* GET users listing. */
router.post('/', (req, res) => {
  const { variable } = req.body;
  res.json(variable);
});

/* GET users listing. */
router.post('/:bonjour', (req, res) => {
  const { bonjour } = req.params;
  res.json(bonjour);
});

module.exports = router;
