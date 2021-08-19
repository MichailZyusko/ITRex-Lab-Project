import chalk from 'chalk';
import queue from '../../../storage/index.js';

export default async ({ ID }, res, next) => {
  try {
    const { result: searchingResult } = await queue.findClient(ID);

    // TODO Тут я потом добавлю throw new Error в методу findClient чтобы убрать if
    if (searchingResult !== 'Nothing was found for your query') {
      console.log((chalk.cyanBright(`> Finding ${searchingResult.firstName} in outgoingQueue`)));
    }

    res.send(searchingResult);
  } catch (error) {
    next(error);
  }
};
