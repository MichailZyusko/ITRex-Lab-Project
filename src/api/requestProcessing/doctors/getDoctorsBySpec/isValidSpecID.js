import validator from 'validator';
import ApiError from '../../../../errors/ApiError.js';

class GetSpecializationID {
  /**
   * DTO для получения данных из req
   *
   * @constructor
   * @param {string} id - UUID специализации доктора
   */
  constructor({ params: { id } } = {}) {
    this.specializationID = id;
  }
}

/**
 * Валидация входных данных
 *
 * @param {string} id - UUID специализации доктора
 * @returns {boolean}
 */
const isValid = (id) => validator.isUUID(id);

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
    const { specializationID } = new GetSpecializationID(req);

    if (!specializationID) {
      throw new ApiError(400, 'SpecializationID is empty');
    }

    if (!isValid(specializationID)) {
      throw new ApiError(400, 'Not valid specializationID');
    }

    req.data = specializationID;
    next();
  } catch (error) {
    next(error);
  }
};
