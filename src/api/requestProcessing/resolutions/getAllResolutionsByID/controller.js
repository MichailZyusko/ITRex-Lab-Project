import database from '../../../database/DatabaseStorage.js';

export default async ({ data: doctorID }, res, next) => {
  try {
    res.send(await database.getAllResolutionsByID(doctorID));
  } catch (error) {
    console.error(error);
    next(error);
  }
};
