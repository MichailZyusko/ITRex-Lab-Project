import validator from 'validator';
import ApiError from '../../../../errors/ApiError.js';

class DeletePatientDTO {
  constructor({ params: { id } } = {}) {
    this.resolutionID = id;
  }
}

const isValid = (resolutionID) => validator.isUUID(resolutionID);

export default async (req, res, next) => {
  try {
    const { resolutionID } = new DeletePatientDTO(req);
    if (!resolutionID) {
      throw new ApiError(400, 'ResolutionID is empty');
    }

    if (!isValid(resolutionID)) {
      throw new ApiError(400, 'ResolutionID does not valid');
    }

    req.data = resolutionID;
    next();
  } catch (error) {
    next(error);
  }
};
