import validator from 'validator';
import { ApiError } from '../../classes/index.js';

const isValid = (obj) => (validator.isEmail(obj.email)
  && validator.isAlpha(obj.firstName)
  && validator.isAlpha(obj.lastName)
  && validator.isIn(obj.gender, ['Male', 'Female', 'male', 'female'])
  && validator.isInt(obj.fullAge.toString()));

export default async ({ client }, res, next) => {
  try {
    if (!isValid(client)) {
      throw new ApiError(400, 'Not valid form data');
    }

    next();
  } catch (error) {
    next(error);
  }
};
