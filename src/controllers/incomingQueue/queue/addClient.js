/* eslint-disable consistent-return */

import chalk from 'chalk';
import incomingQueue from '../storage/index.js';

export default async (req, res, next) => {
  try {
    incomingQueue.addClient(req.body);
    console.log(chalk.green(`>> ${req.body.firstName} added to incomingQueue`));

    next();
  } catch (error) {
    console.error(error);
    return null;
  }
};
