import database from '../../../database/DatabaseStorage.js';

export default async (req, res, next) => {
  try {
    const allPatients = await database.getAllSpecializations();

    res.send(allPatients);
  } catch (error) {
    console.error(error);
    next(error);
  }
};
