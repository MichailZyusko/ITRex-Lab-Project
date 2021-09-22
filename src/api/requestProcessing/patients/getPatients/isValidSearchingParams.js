import validator from 'validator';
import ApiError from '../../../../errors/ApiError.js';

class GetAllPatientDTO {
  /**
   * DTO для получения данных из req
   *
   * @constructor
   * @param {string} search - текст для полнотекстового поиска
   */
  constructor({ query: { search } }) {
    this.text = search;
  }
}

/**
 * Валидация входящих данных
 *
 * @param {string} text - текст для полнотекстового поиска
 * @returns {boolean}
 */
const isValid = (text) => !validator.isEmpty(text);

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
    const { text } = new GetAllPatientDTO(req);

    if (!text) {
      throw new ApiError(400, 'Empty searching params');
    }

    if (!isValid(text)) {
      throw new ApiError(400, 'Not valid searching params');
    }

    req.data = text;
    next();
  } catch (error) {
    next(error);
  }
};
