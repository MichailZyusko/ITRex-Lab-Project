import queue from '../../../../storage/index.js';

export default async ({ data: { specializationID: queueID } }, res, next) => {
  try {
    const positionInQueue = await queue.storage.getQueueLength(queueID);

    res.status(201).send({ positionInQueue });
  } catch (error) {
    console.error(error);
    next(error);
  }
};
