import validator from 'validator';
import ApiError from '../../../../errors/ApiError.js';

class GetPatientID {
  /**
   * DTO для получения данных из req
   *
   * @constructor
   * @param {string} patientID - UUID пациента
   */
  constructor({ patientID } = {}) {
    this.patientID = patientID;
  }
}

/**
 * Валидация входящих данных
 *
 * @param {string} id - UUID пациента
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
    const { patientID } = new GetPatientID(req);

    if (!patientID) {
      throw new ApiError(400, 'PatientID is empty');
    }

    if (!isValid(patientID)) {
      throw new ApiError(400, 'Not valid patientID');
    }

    req.data = patientID;
    next();
  } catch (error) {
    next(error);
  }
};
