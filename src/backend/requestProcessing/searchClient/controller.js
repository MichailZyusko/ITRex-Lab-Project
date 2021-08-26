import queue from '../../../storage/index.js';

export default async ({ body: { searchClient } }, res, next) => {
  try {
    const { result: searchingResult } = await queue.findClient(searchClient);

    res.send({ searchingResult });
  } catch (error) {
    next(error);
  }
};
