import queue from '../../../storage/index.js';
import { ApiError } from '../../classes/index.js';

const isExist = async (key) => !queue.storage.has(key);

export default async ({ ID }, res, next) => {
  try {
    if (await isExist(ID)) {
      throw new ApiError(400, 'This ID does not exist');
    }

    next();
  } catch (error) {
    next(error);
    console.log(error);
  }
};
