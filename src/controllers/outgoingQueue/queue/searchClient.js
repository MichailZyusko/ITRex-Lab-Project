/* eslint-disable consistent-return */

import chalk from 'chalk';
import outgoingQueue from '../storage/index.js';

export default async (req, res, next) => {
  try {
    req.body = outgoingQueue.findClient(req.body);
    console.log((chalk.cyanBright(`> Finding ${req.body.search} in outgoingQueue`)));

    next();
  } catch (error) {
    console.error(error);
    return null;
  }
};
