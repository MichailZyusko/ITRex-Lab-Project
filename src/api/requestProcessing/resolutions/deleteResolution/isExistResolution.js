import ApiError from '../../../../errors/ApiError.js';
import Database from '../../../database/DatabaseStorage.js';

const isExist = async (resolutionID) => !await Database.getResolutionByID(resolutionID);

export default async ({ data: resolutionID }, res, next) => {
  try {
    if (await isExist(resolutionID)) {
      throw new ApiError(404, 'This resolution does not exist');
    }

    next();
  } catch (error) {
    next(error);
  }
};
