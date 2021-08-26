import queue from '../../../storage/index.js';

export default async ({ body: { diagnose, ID, TTL } }, res, next) => {
  try {
    await queue.setDiagnose(ID, diagnose, TTL);

    res.status(201).send({ result: 'Everything is good' });
  } catch (error) {
    next(error);
  }
};
