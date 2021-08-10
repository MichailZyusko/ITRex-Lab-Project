/* eslint-disable consistent-return */

import chalk from 'chalk';
import outgoingQueue from '../storage/index.js';

// Использовать фильтр для удаления элемента
export default async (req, res, next) => {
  try {
    req.body = outgoingQueue.deleteClient(req.body);
    console.log(chalk.bgRedBright(`<< Deleting ${req.body.search} from outgoingQueue`));

    next();
  } catch (error) {
    console.error(error);
    return null;
  }
};
