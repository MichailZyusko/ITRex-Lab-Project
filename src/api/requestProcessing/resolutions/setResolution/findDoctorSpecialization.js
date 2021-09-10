import DatabaseStorage from '../../../database/DatabaseStorage.js';

export default async (req, res, next) => {
  try {
    const result = await DatabaseStorage.findSpecialization(req.data.userID);
    req.doctor = result.specializationName;
    next();
  } catch (error) {
    console.error(error);
    next(error);
  }
};
