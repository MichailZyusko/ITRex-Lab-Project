import queue from '../../../../storage/index.js';
import ApiError from '../../../../errors/ApiError.js';

const isExist = async (key) => !queue.isExistPatient(key);

export default async ({ data: { ID } }, res, next) => {
  try {
    if (await isExist(ID)) {
      throw new ApiError(404, 'This client does not exist');
    }

    next();
  } catch (error) {
    next(error);
  }
};
