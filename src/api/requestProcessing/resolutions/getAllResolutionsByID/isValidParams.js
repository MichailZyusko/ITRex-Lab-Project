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
    const { patientID } = new FindResolutionDTO(req);

    if (!patientID) {
      throw new ApiError(400, 'Request searchString is empty');
    }

    if (!isValid(patientID)) {
      throw new ApiError(400, 'searchString does not valid');
    }

    req.data = patientID;
    next();
  } catch (error) {
    next(error);
  }
};
