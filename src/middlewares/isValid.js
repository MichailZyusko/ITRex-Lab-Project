/* eslint-disable consistent-return */

const validator = require('validator');

const isValid = (obj) => {
  if (validator.isEmail(obj.email)
  && validator.isAlpha(obj.firstName)
  && validator.isAlpha(obj.lastName)
  && validator.isIn(obj.gender, ['Male', 'Female', 'male', 'female'])
  && validator.isInt(obj.fullAge.toString())
  ) {
    return true;
  }

  return false;
};

module.exports = async (req, res, next) => {
  try {
    if (!isValid(req.body)) {
      res.status(404).send({ result: 'Not valid form data' });
      return null;
    }

    next();
  } catch (error) {
    console.error(error);
    return null;
  }
};
