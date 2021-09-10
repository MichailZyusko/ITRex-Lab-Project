import validator from 'validator';
import ApiError from '../../../../errors/ApiError.js';

class AddClientDto {
  constructor({ patientID } = {}) {
    this.patientID = patientID;
  }
}

const isValid = (patientID, specializationID) => (validator.isUUID(patientID) && validator.isUUID(specializationID));

export default async (req, res, next) => {
  try {
    const { patientID } = new AddClientDto(req);

    if (!patientID) {
      throw new ApiError(400, 'Request body is empty');
    }

    if (!isValid(patientID, req.query.specializationID)) {
      throw new ApiError(400, 'Not valid form data');
    }

    req.data = patientID;
    req.queue = req.query.specializationID;
    next();
  } catch (error) {
    next(error);
  }
};
