// import validator from 'validator';
import ApiError from '../../../../errors/ApiError.js';

class GetAllPatientDTO {
  constructor({ query: { search } }) {
    this.text = search;
  }
}

// const isValid = (text) => validator.isAlpha(text);

export default async (req, res, next) => {
  try {
    const { text } = new GetAllPatientDTO(req);

    if (!text) {
      throw new ApiError(400, 'Empty searching params');
    }

    // if (!isValid(text)) {
    //   throw new ApiError(400, 'Not valid searching params');
    // }

    req.data = text;
    next();
  } catch (error) {
    next(error);
  }
};
