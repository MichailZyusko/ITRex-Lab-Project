/* eslint-disable consistent-return */

import queue from '../../database/index.js';
import { ApiError } from '../classes/index.js';

const replacer = (key, value) => {
  if (key === 'ID') {
    return undefined;
  }
  return value;
};

async function isExist(obj) {
  return new Promise(async (resolve, reject) => {
    const array = await queue.getClients();
    const find = array.find((e) => JSON.stringify(e, replacer) === JSON.stringify(obj, replacer));
    resolve(find);
  });
}

export default async (req, res, next) => {
  try {
    if (await isExist(req.body)) {
      throw new ApiError(400, `Bad request: this ${req.body.firstName} ${req.body.lastName} exist`);
    }

    next();
  } catch (error) {
    next(error);
  }
};
