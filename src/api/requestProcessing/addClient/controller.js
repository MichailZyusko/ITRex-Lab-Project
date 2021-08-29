/* eslint-disable no-param-reassign */

import { v4 as uuidv4 } from 'uuid';
import queue from '../../../storage/index.js';

export default async ({ data: client }, res, next) => {
  try {
    client.clientID = uuidv4();
    await queue;
    await queue.addClient(client);

    res.status(201).send();
  } catch (error) {
    console.error(error);
    next(error);
  }
};
