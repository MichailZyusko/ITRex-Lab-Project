/* eslint-disable consistent-return */

import validator from 'validator';

// Мб можно убрать !!
const isValid = (obj) => !!(validator.isEmail(obj.email)
    && validator.isAlpha(obj.firstName)
    && validator.isAlpha(obj.lastName)
    && validator.isIn(obj.gender, ['Male', 'Female', 'male', 'female'])
    && validator.isInt(obj.fullAge.toString()));

export default async (req, res, next) => {
  try {
    if (!isValid(req.body)) {
      res.status(400).send({ result: 'Not valid form data' });
      return null;
    }

    next();
  } catch (error) {
    console.error(error);
    return null;
  }
};
