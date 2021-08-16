/* eslint-disable consistent-return */

import chalk from 'chalk';
import queue from '../../../database/index.js';

export default async (req, res, next) => {
  try {
    req.body = await queue.deleteClient(+req?.data?.reqParam?.id);
    console.log(chalk.bgRed(`<< ${req.body.result.firstName} removed from queue`));

    res.send(req.body);
  } catch (error) {
    next(error);
  }
};
