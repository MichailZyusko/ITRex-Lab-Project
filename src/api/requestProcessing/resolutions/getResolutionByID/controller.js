import database from '../../../database/DatabaseStorage.js';

export default async ({ data: resolutionID }, res, next) => {
  try {
    res.send(await database.getResolutionByID(resolutionID));
  } catch (error) {
    console.error(error);
    next(error);
  }
};
