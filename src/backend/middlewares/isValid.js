/* eslint-disable consistent-return */

import validator from 'validator';
import { ApiError } from '../classes/index.js';

const isValid = (obj) => (validator.isEmail(obj.email)
    && validator.isAlpha(obj.firstName)
    && validator.isAlpha(obj.lastName)
    && validator.isIn(obj.gender, ['Male', 'Female', 'male', 'female'])
    && validator.isInt(obj.fullAge.toString()));

const isValidResolution = (obj) => validator.isAlpha(obj.value);

const isValidData = async (req, res, next) => {
  try {
    if (!isValid(req.body)) {
      throw new ApiError(400, 'Bad request: not valid form data');
    }

    next();
  } catch (error) {
    next(error);
  }
};

const isValidDiagnose = async (req, res, next) => {
  try {
    if (!isValidResolution(req.body)) {
      throw new ApiError(400, 'Bad request: not valid diagnose');
    }

    next();
  } catch (error) {
    next(error);
  }
};

export { isValidDiagnose, isValidData };
