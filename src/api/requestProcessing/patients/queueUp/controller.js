import queue from '../../../../storage/index.js';

export default async ({ queue: queueID }, res, next) => {
  try {
    const positionInQueue = await queue.storage.getQueueLengt(queueID);

    res.status(201).send({ positionInQueue });
  } catch (error) {
    console.error(error);
    next(error);
  }
};
