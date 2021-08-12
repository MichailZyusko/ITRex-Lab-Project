/* eslint-disable consistent-return */

import queue from '../storage/index.js';

export default async (req, res, next) => {
  try {
    res.send(queue.data);
  } catch (error) {
    next(error);
  }
};
