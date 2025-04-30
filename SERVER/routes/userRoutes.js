const express = require('express');
const router = express.Router();

module.exports = (usersCollections) => {
  router.post('/', async (req, res) => {
    const user = req.body;
    const result = await usersCollections.insertOne(user);
    res.send(result);
  });

  router.get('/', async (req, res) => {
    const results = await usersCollections.find().toArray();
    res.send(results);
  });

  return router;
};
