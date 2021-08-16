/* eslint-disable consistent-return */

import chalk from 'chalk';
import queue from '../../../database/index.js';
import { ApiError } from '../../classes/index.js';

export default async (req, res, next) => {
  try {
    if (+req.data.reqParam.id < 0) {
      throw new ApiError(400, 'Bad request: incorrect search ID');
    }

    req.body = await queue.findClient(+req.data.reqParam.id);
    if (req.body.result !== 'Nothing was found for your query') {
      console.log((chalk.cyanBright(`> Finding ${req.body.result.firstName} in outgoingQueue`)));
    }

    res.send(req.body);
  } catch (error) {
    next(error);
  }
};
