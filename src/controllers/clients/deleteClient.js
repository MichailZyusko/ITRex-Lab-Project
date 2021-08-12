/* eslint-disable consistent-return */

import chalk from 'chalk';
import queue from '../storage/index.js';
import { DTO } from '../../classes/index.js';

export default async (req, res, next) => {
  try {
    const client = new DTO(req);
    req.body = queue.deleteClient(client.reqParam.id);
    console.log(chalk.bgRed(`<< ${req.body.result.firstName} removed from queue`));

    res.send(req.body);
  } catch (error) {
    next(error);
  }
};
