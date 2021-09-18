import validator from 'validator';
import ApiError from '../../../../errors/ApiError.js';

class AddPatientDto {
  constructor({ patientID, query: { doctorID } } = {}) {
    this.patientID = patientID;
    this.doctorID = doctorID;
  }
}

const isValid = (patientID, doctorID) => validator.isUUID(patientID)
  && validator.isUUID(doctorID);

export default async (req, res, next) => {
  try {
    const { patientID, doctorID } = new AddPatientDto(req);

    if (!(patientID && doctorID)) {
      throw new ApiError(400, 'Bad request');
    }

    if (!isValid(patientID, doctorID)) {
      throw new ApiError(400, 'Not valid form data');
    }

    req.data = {
      patientID,
      doctorID,
    };
    next();
  } catch (error) {
    next(error);
  }
};
