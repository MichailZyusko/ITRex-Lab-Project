import validator from 'validator';
import ApiError from '../../../../errors/ApiError.js';

class FindResolutionDTO {
  constructor({ params: { id } } = {}) {
    this.patientID = id;
  }
}

const isValid = (patientID) => validator.isUUID(patientID);

export default async (req, res, next) => {
  try {
    let { patientID } = new FindResolutionDTO(req);

    if (patientID === 'false') {
      patientID = req.patientID;
    }

    if (!patientID) {
      throw new ApiError(400, 'PatientID is empty');
    }

    if (!isValid(patientID)) {
      throw new ApiError(400, 'PatientID does not valid');
    }

    req.data = patientID;
    next();
  } catch (error) {
    next(error);
  }
};
