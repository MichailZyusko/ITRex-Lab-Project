/* eslint-disable consistent-return */

import chalk from 'chalk';
import incomingQueue from '../storage/index.js';

export default async (req, res, next) => {
  try {
    incomingQueue.setCurrentClient(req.body);
    req.body = incomingQueue.currentClient;
    if (req.body.value) {
      console.log(chalk.green(`>> Current client is ${req.body.value.firstName} ${req.body.value.lastName}`));
    } else {
      console.log(chalk.red('>> Current is gone'));
    }

    next();
  } catch (error) {
    console.error(error);
    return null;
  }
};
