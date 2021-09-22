import validator from 'validator';
import ApiError from '../../../../errors/ApiError.js';

class DeletePatientDTO {
  constructor({ params: { id } } = {}) {
    /**
     * DTO для получения данных из req
     *
     * @param {string} id - UUID резолюции
     */
    this.resolutionID = id;
  }
}

/**
 * Валидация входящих данных
 *
 * @param {string} resolutionID - UUID резолюции
 * @returns {boolean}
 */
const isValid = (resolutionID) => validator.isUUID(resolutionID);

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
    const { resolutionID } = new DeletePatientDTO(req);
    if (!resolutionID) {
      throw new ApiError(400, 'ResolutionID is empty');
    }

    if (!isValid(resolutionID)) {
      throw new ApiError(400, 'ResolutionID does not valid');
    }

    req.data = resolutionID;
    next();
  } catch (error) {
    next(error);
  }
};
