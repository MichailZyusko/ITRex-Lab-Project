import DatabaseStorage from '../../../../database/index.js';

export default async (req, res, next) => {
  try {
    const result = await DatabaseStorage.findSpecialization(req.data);
    req.data = result.specialization_id;
    next();
  } catch (error) {
    console.error(error);
    next(error);
  }
};
