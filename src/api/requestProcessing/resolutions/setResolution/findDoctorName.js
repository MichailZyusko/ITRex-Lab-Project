import DatabaseStorage from '../../../database/index.js';

export default async (req, res, next) => {
  try {
    const result = await DatabaseStorage.getDoctor(req.data.doctorID);
    req.doctor_full_name = `${result.first_name} ${result.last_name}`;
    next();
  } catch (error) {
    console.error(error);
    next(error);
  }
};
