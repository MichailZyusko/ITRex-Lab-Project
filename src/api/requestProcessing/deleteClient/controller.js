import queue from '../../../storage/index.js';

export default async ({ data: searchClient }, res, next) => {
  try {
    await queue.deleteClient(searchClient);

    res.status(204).send();
  } catch (error) {
    console.error(error);
    next(error);
  }
};
