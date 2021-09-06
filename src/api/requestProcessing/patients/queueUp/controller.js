import queue from '../../../../storage/index.js';

export default async (req, res, next) => {
  try {
    const positionInQueue = await queue.storage.getQueueLengt(queue.queueID);

    res.status(201).send({ positionInQueue });
  } catch (error) {
    console.error(error);
    next(error);
  }
};
