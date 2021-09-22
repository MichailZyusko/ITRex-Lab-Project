import validator from 'validator';
import ApiError from '../../../../../errors/ApiError.js';

class SetDiagnoseDTO {
  /**
   * DTO для получения данных из req
   *
   * @constructor
   * @param {string} login - логин пользователя
   * @param {string} password - пароль пользователя
   */
  constructor({ body: { login, password } }) {
    this.password = password;
    this.login = login;
  }
}

/**
 * Валидация входных данных пользователя
 *
 * @param {string} login - логин пользователя
 * @returns {boolean}
 */
const isValid = (login) => validator.isEmail(login);

/**
 * Middleware для валидации входящих данных
 *
 * @param {object} req - объект запроса
 * @param {object} res - объект ответа
 * @param {function} next - следующая функция промежуточной обработки
 * @returns {Promise<void>}
 */
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
