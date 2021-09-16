import validator from 'validator';
import ApiError from '../../../../errors/ApiError.js';

class AddPatientDto {
  constructor({ patientID, query: { specializationID } } = {}) {
    this.patientID = patientID;
    this.specializationID = specializationID;
  }
}

const isValid = (patientID, specializationID) => validator.isUUID(patientID)
  && validator.isUUID(specializationID);

export default async (req, res, next) => {
  try {
    const { patientID, specializationID } = new AddPatientDto(req);

    if (!patientID) {
      throw new ApiError(400, 'PatientID is empty');
    }

    if (!isValid(patientID, specializationID)) {
      throw new ApiError(400, 'Not valid form data');
    }

    req.data = {
      patientID,
      specializationID,
    };
    // req.queue = req.query.specializationID;
    next();
  } catch (error) {
    next(error);
  }
};
