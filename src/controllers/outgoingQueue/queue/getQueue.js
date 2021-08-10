/* eslint-disable consistent-return */

import outgoingQueue from '../storage/index.js';

export default async (req, res) => {
  try {
    res.send(outgoingQueue.data);
  } catch (error) {
    console.error(error);
    return null;
  }
};
