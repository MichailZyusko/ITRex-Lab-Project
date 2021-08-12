/* eslint-disable consistent-return */

import chalk from 'chalk';
import queue from '../storage/index.js';
import { DTO, ApiError } from '../../classes/index.js';

export default async (req, res, next) => {
  try {
    const client = new DTO(req);
    if (+client.reqParam.id >= 0) {
      req.body = queue.findClient(client.reqParam.id);
      console.log((chalk.cyanBright(`> Finding ${req.body.result.firstName} in outgoingQueue`)));

      res.send(req.body);
    } else {
      throw new ApiError(400, 'Bad request: incorrect search ID');
    }
  } catch (error) {
    next(error);
  }
};
