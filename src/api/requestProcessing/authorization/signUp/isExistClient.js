import ApiError from '../../../../errors/ApiError.js';
import DatabaseStorage from '../../../database/DatabaseStorage.js';

const isExist = async (patient) => DatabaseStorage.isExistPatient(patient);

export default async ({ data: patient }, res, next) => {
  try {
    if (await isExist(patient)) {
      throw new ApiError(404, 'This patient alredy exist');
    }

    res.data = patient;
    next();
  } catch (error) {
    next(error);
  }
};
