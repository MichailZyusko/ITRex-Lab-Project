/* eslint-disable consistent-return */

import chalk from 'chalk';
import queue from '../storage/index.js';
import { DTO } from '../../classes/index.js';

export default async (req, res, next) => {
  try {
    const client = new DTO(req);
    req.body = queue.setDiagnose(client.reqParam.id, client.body);

    if (req.body.result.TTL >= 0) {
      setTimeout(() => queue.deleteClient(client.reqParam.id), req.body.result.TTL);
    }

    console.log(chalk.yellow(`<< ${req.body.result.firstName} has been diagnosed by a doctor`));

    res.send(req.body);
  } catch (error) {
    next(error);
  }
};
