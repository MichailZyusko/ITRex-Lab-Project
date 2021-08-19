import chalk from 'chalk';
import queue from '../../../storage/index.js';

export default async ({ ID }, res, next) => {
  try {
    const { result: deletingResult } = await queue.deleteClient(ID);

    console.log(chalk.bgRed(`<< ${deletingResult.firstName} removed from queue`));

    res.status(201).send({ result: 'Everything is good' });
  } catch (error) {
    next(error);
  }
};
