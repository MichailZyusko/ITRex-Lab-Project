import DatabaseStorage from '../../../database/index.js';

export default async (req, res, next) => {
  try {
    const result = await DatabaseStorage.findSpecialization(req.data.doctorID);
    req.doctor = result.specialization_name;
    next();
  } catch (error) {
    console.error(error);
    next(error);
  }
};
