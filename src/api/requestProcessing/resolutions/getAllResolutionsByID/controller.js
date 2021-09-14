import database from '../../../database/DatabaseStorage.js';

export default async ({ params: { id: patientID } }, res, next) => {
  try {
    res.send(await database.getAllResolutionsByID(patientID));
  } catch (error) {
    console.error(error);
    next(error);
  }
};
