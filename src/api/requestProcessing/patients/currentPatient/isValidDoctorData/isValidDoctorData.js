import validator from 'validator';
import ApiError from '../../../../../errors/ApiError.js';

const isValid = (doctorID) => validator.isUUID(doctorID);

export default async (req, res, next) => {
  try {
    const { doctorID } = req;

    if (!doctorID) {
      throw new ApiError(400, 'DoctorID is empty');
    }

    if (!isValid(doctorID)) {
      throw new ApiError(400, 'Not valid doctorID');
    }

    req.data = doctorID;
    next();
  } catch (error) {
    next(error);
  }
};
