// import validator from 'validator';
import ApiError from '../../../../errors/ApiError.js';

class SetDiagnoseDTO {
  constructor({ body: { login, password } }) {
    this.password = password;
    this.login = login;
  }
}

// const isValid = (password, login) => validator.isEmail(login);
// && validator.isAlpha(password);

export default async (req, res, next) => {
  try {
    const { password, login } = new SetDiagnoseDTO(req);

    if (!(password && login)) {
      throw new ApiError(400, 'Invalid request body');
    }

    // if (!isValid(password, login)) {
    //   throw new ApiError(400, 'Not valid diagnose');
    // }

    req.data = { password, login };
    next();
  } catch (error) {
    next(error);
  }
};
