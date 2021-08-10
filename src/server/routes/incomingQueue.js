import express from 'express';
import { currentClient, incomingQueue } from '../../controllers/index.js';
import { isExist, isValid, sendResponse } from '../../middlewares/index.js';

const { getCurrentClient, setCurrentClient } = currentClient;
const { addClient, deleteClient, getQueue } = incomingQueue;

const router = express.Router();

router.route('/')
  .get(getQueue)
  .post(isValid, isExist, addClient, sendResponse)
  .delete(isValid, deleteClient, sendResponse);

router.route('/currentClient')
  .get(getCurrentClient)
  .post(setCurrentClient, sendResponse);

export default router;
