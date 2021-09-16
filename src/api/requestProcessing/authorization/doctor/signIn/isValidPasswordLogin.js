import validator from 'validator';
import ApiError from '../../../../../errors/ApiError.js';

class SetDiagnoseDTO {
  constructor({ body: { login, password } }) {
    this.password = password;
    this.login = login;
  }
}

const isValid = (login) => validator.isEmail(login);

export default async (req, res, next) => {
  try {
    const { password, login } = new SetDiagnoseDTO(req);

    if (!(password && login)) {
      throw new ApiError(400, 'Empty password or login');
    }

    if (!isValid(login)) {
      throw new ApiError(400, 'Not valid login');
    }

    req.data = { password, login };
    next();
  } catch (error) {
    next(error);
  }
};
