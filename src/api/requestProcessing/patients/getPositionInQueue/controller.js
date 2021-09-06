import queue from '../../../../storage/index.js';

export default async (req, res, next) => {
  try {
    const positions = await queue.getPopsitionInQueue();

    res.send(positions);
  } catch (error) {
    console.error(error);
    next(error);
  }
};
