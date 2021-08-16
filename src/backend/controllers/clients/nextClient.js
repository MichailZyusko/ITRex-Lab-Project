/* eslint-disable consistent-return */

import chalk from 'chalk';
import queue from '../../../database/index.js';

export default async (req, res, next) => {
  try {
    if (req?.data?.reqParam?.id === 'log') {
      console.log(chalk.yellow(`<< ${req.body.currentClient.firstName} walks into the doctor's office`));
    }
    req.body = await queue.callNextClient();

    res.send(req.body);
  } catch (error) {
    next(error);
  }
};
