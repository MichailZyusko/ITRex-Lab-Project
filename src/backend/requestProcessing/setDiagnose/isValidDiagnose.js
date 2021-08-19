import validator from 'validator';
import { ApiError } from '../../classes/index.js';

const isValid = (diagnose, ID, TTL) => validator.isAlpha(diagnose)
  && validator.isInt(ID.toString())
  && validator.isInt(TTL.toString());

export default async ({ diagnose, ID, TTL }, res, next) => {
  try {
    if (!isValid(diagnose, ID, TTL)) {
      throw new ApiError(400, 'Not valid diagnose');
    }

    next();
  } catch (error) {
    next(error);
  }
};
