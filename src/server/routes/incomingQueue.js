const express = require('express');

const { incomingQueue, currentClient } = require('../../controllers/index.js');
const { isValid, isExist, sendResponse } = require('../../middlewares/index.js');

const { getCurrentClient, setCurrentClient } = currentClient;
const { addClient, deleteClient, getQueue } = incomingQueue;

const router = express.Router();

router.route('/incomingQueue')
  .get(getQueue)
  .post(isValid, isExist, addClient, sendResponse)
  .delete(isValid, deleteClient, sendResponse);

router.route('/incomingQueue/currentClient')
  .get(getCurrentClient)
  .post(setCurrentClient, sendResponse);

module.exports = router;
