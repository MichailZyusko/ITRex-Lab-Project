import queue from '../../../storage/index.js';
import { ApiError } from '../../classes/index.js';

const isExist = async (key) => !await queue.storage.get(key);

export default async ({ data: searchClient }, res, next) => {
  try {
    if (await isExist(searchClient)) {
      throw new ApiError(404, 'This client does not exist');
    }

    next();
  } catch (error) {
    next(error);
  }
};
