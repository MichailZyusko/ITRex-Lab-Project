import database from '../../../database/index.js';

export default async ({ data: patientID }, res, next) => {
  try {
    res.send(await database.getResolutionsByID(patientID));
  } catch (error) {
    console.error(error);
    next(error);
  }
};
