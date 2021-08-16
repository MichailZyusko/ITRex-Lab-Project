/* eslint-disable consistent-return */

import chalk from 'chalk';
import queue from '../../../database/index.js';

export default async (req, res, next) => {
  try {
    req.body = await queue.setDiagnose(req?.data?.reqParam?.id, req?.data?.body);

    if (req.body.result.TTL >= 0) {
      setTimeout(async () => await queue.deleteClient(req?.data?.reqParam?.id), req.body.result.TTL);
    }

    console.log(chalk.yellow(`<< ${req.body.result.firstName} has been diagnosed by a doctor`));

    res.send(req.body);
  } catch (error) {
    next(error);
  }
};
