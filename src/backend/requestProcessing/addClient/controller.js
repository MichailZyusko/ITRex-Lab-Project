import queue from '../../../storage/index.js';

export default async ({ body: { client } }, res, next) => {
  try {
    await queue.addClient(client);

    // Возвращать не просто строку, а currentClient and nexyClient
    // Сделать отдельный класс для этого
    res.status(201).send({ result: 'Everything is good' });
  } catch (error) {
    next(error);
  }
};
