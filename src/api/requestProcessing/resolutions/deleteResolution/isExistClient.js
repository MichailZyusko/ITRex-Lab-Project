import queue from '../../../../storage/index.js';
import ApiError from '../../../../errors/ApiError.js';

const isExist = async (resolutionID) => !await queue.storage.get(resolutionID);

export default async ({ data: resolutionID }, res, next) => {
  try {
    if (await isExist(resolutionID)) {
      throw new ApiError(404, 'This client does not exist');
    }

    next();
  } catch (error) {
    next(error);
  }
};
