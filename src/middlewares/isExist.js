/* eslint-disable consistent-return */

import incomingQueue from '../controllers/incomingQueue/storage/index.js';

const isExist = (obj) => incomingQueue.data.find((e) => JSON.stringify(e) === JSON.stringify(obj));

export default async (req, res, next) => {
  try {
    if (isExist(req.body)) {
      res.status(400).send({ result: 'This client exist' });
      return null;
    }

    next();
  } catch (error) {
    console.error(error);
    return null;
  }
};
