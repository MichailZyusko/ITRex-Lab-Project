import validator from 'validator';
import ApiError from '../../../../errors/ApiError.js';

class GetSpecializationID {
  constructor({ params: { id } } = {}) {
    this.specializationID = id;
  }
}

const isValid = (text) => validator.isUUID(text);

export default async (req, res, next) => {
  try {
    const { specializationID } = new GetSpecializationID(req);

    if (!specializationID) {
      throw new ApiError(400, 'SpecializationID is empty');
    }

    if (!isValid(specializationID)) {
      throw new ApiError(400, 'Not valid specializationID');
    }

    req.data = specializationID;
    next();
  } catch (error) {
    next(error);
  }
};
