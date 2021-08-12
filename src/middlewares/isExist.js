/* eslint-disable consistent-return */

import queue from '../controllers/storage/index.js';
import { ApiError } from '../classes/index.js';

const replacer = (key, value) => {
  if (key === 'ID') {
    return undefined;
  }
  return value;
};

// eslint-disable-next-line max-len
const isExist = (obj) => queue.data.find((e) => JSON.stringify(e, replacer) === JSON.stringify(obj, replacer));

export default async (req, res, next) => {
  try {
    if (isExist(req.body)) {
      throw new ApiError(400, `Bad request: this ${req.body.firstName} ${req.body.lastName} exist`);
    }

    next();
  } catch (error) {
    next(error);
  }
};
