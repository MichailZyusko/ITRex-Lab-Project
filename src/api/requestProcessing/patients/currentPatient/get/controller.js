import queue from '../../../../../storage/index.js';

export default async (req, res, next) => {
  try {
    res.send(await queue.getCurrentPatient(req.data));
  } catch (error) {
    console.error(error);
    next(error);
  }
};
