import validator from 'validator';
import { ApiError } from '../../classes/index.js';

const isValid = (ID) => validator.isInt(ID.toString());

export default async ({ ID }, res, next) => {
  try {
    if (!isValid(ID)) {
      throw new ApiError(400, 'ID does not valid');
    }

    next();
  } catch (error) {
    next(error);
  }
};
