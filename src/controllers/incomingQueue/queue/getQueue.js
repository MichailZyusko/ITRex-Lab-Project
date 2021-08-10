/* eslint-disable consistent-return */

import incomingQueue from '../storage/index.js';

export default async (req, res) => {
  try {
    res.send(incomingQueue.data);
  } catch (error) {
    console.error(error);
    return null;
  }
};
