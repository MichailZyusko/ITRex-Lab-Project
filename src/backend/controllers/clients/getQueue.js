/* eslint-disable consistent-return */

import queue from '../../../database/index.js';

export default async (req, res, next) => {
  try {
    res.send(await queue.getClients());
  } catch (error) {
    next(error);
  }
};
