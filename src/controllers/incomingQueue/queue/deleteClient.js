/* eslint-disable consistent-return */

import chalk from 'chalk';
import incomingQueue from '../storage/index.js';

// Использовать фильтр для удаления элемента
export default async (req, res, next) => {
  try {
    console.log(chalk.yellow(`<< ${req.body.firstName} walks into the doctor's office`));
    incomingQueue.deleteClient();

    next();
  } catch (error) {
    console.error(error);
    return null;
  }
};
