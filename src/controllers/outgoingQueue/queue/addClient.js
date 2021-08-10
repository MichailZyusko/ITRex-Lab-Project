/* eslint-disable consistent-return */

import chalk from 'chalk';
import outgoingQueue from '../storage/index.js';

export default async (req, res, next) => {
  try {
    outgoingQueue.addClient(req.body);

    if (req.body.TTL >= 0) {
      setTimeout(() => {
        outgoingQueue.deleteClient({ search: req.body.firstName });
      }, req.body.TTL);
    }

    console.log(chalk.blueBright(`>> ${req.body.firstName} added to outgoingQueue`));

    next();
  } catch (error) {
    console.error(error);
    return null;
  }
};
