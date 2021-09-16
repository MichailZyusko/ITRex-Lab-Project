import database from '../../../database/DatabaseStorage.js';

export default async ({ data }, res, next) => {
  try {
    const allPatients = await database.getAllPatientLikeValue(data);
    res.send(allPatients);
  } catch (error) {
    console.error(error);
    next(error);
  }
};
