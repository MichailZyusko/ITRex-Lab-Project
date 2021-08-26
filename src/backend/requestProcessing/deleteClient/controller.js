import queue from '../../../storage/index.js';

export default async ({ body: { searchClient } }, res, next) => {
  try {
    await queue.deleteClient(searchClient);

    res.status(201).send({ result: 'Everything is good' });
  } catch (error) {
    next(error);
  }
};
