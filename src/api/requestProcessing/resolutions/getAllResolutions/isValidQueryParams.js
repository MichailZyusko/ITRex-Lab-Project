import validator from 'validator';
import ApiError from '../../../../errors/ApiError.js';

class GetPatientID {
  constructor({ patientID } = {}) {
    this.patientID = patientID;
  }
}

const isValid = (patientID) => validator.isUUID(patientID);

export default async (req, res, next) => {
  try {
    const { patientID } = new GetPatientID(req);

    if (!patientID) {
      throw new ApiError(400, 'Request searchString is empty');
    }

    if (!isValid(patientID)) {
      throw new ApiError(400, 'searchString does not valid');
    }

    next();
  } catch (error) {
    next(error);
  }
};
