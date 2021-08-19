import queue from '../../../storage/index.js';

export default async (req, res, next) => {
  try {
    res.send(await queue.getClients(0));
  } catch (error) {
    next(error);
  }
};
