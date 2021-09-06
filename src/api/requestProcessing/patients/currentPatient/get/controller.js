import queue from '../../../../../storage/index.js';

export default async (req, res, next) => {
  try {
    res.send(await queue.getCurrentPatient());
  } catch (error) {
    console.error(error);
    next(error);
  }
};
