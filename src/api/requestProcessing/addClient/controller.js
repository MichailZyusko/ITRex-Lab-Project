/* eslint-disable no-param-reassign */

import { v1 as uuidv1 } from 'uuid';
import queue from '../../../storage/index.js';

export default async ({ data: client }, res, next) => {
  try {
    client.clientID = uuidv1();
    await queue.addClient(client);

    res.status(201).send();
  } catch (error) {
    console.error(error);
    next(error);
  }
};
