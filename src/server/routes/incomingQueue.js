const express = require('express');

const { addClient, getIncomingQueue, removeClient } = require('../../controllers/incomingQueueControllers.js');

const router = express.Router();

router.route('/')
  .get(getIncomingQueue)
  .post(addClient)
  .delete(removeClient);

module.exports = router;
