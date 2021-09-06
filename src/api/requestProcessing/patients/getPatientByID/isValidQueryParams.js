import validator from 'validator';
import ApiError from '../../../../errors/ApiError.js';

class GetPatientID {
  constructor({ patientID } = {}) {
    this.patientID = patientID;
  }
}

const isValid = (text) => validator.isUUID(text);

export default async (req, res, next) => {
  try {
    const { patientID } = new GetPatientID(req);

    if (!patientID) {
      throw new ApiError(400, 'Request body is empty');
    }

    if (!isValid(patientID)) {
      throw new ApiError(400, 'Not valid form data');
    }

    req.data = patientID;
    next();
  } catch (error) {
    next(error);
  }
};
