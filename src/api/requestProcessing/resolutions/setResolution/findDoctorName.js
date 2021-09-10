import DatabaseStorage from '../../../database/DatabaseStorage.js';

export default async (req, res, next) => {
  try {
    const result = await DatabaseStorage.getDoctor(req.data.userID);
    req.doctorName = `${result.firstName} ${result.lastName}`;
    next();
  } catch (error) {
    console.error(error);
    next(error);
  }
};
