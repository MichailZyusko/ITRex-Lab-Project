import database from '../../../database/index.js';

export default async (req, res, next) => {
  try {
    const specializations = await database.getAllSpecializations();

    res.send(specializations);
  } catch (error) {
    console.error(error);
    next(error);
  }
};
