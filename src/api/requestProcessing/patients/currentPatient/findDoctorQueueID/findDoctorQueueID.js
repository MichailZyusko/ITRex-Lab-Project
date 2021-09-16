import DatabaseStorage from '../../../../database/DatabaseStorage.js';

export default async (req, res, next) => {
  try {
    const result = await DatabaseStorage.findSpecialization(req.data);
    req.data = result.specializationID;
    next();
  } catch (error) {
    console.error(error);
    next(error);
  }
};
