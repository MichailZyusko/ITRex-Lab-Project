/* eslint-disable consistent-return */

import chalk from 'chalk';
import queue from '../storage/index.js';
import { DTO } from '../../classes/index.js';

export default async (req, res, next) => {
  try {
    const client = new DTO(req);
    if (client.reqParam === 'log') {
      console.log(chalk.yellow(`<< ${req.body.currentClient.firstName} walks into the doctor's office`));
    }
    req.body = queue.callNextClient();

    res.send(req.body);
  } catch (error) {
    next(error);
  }
};
