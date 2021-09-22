import validator from 'validator';
import ApiError from '../../../../errors/ApiError.js';

class FindResolutionDTO {
  /**
   * DTO для получения данных из req
   *
   * @param {string} id - UUID пациента
   */
  constructor({ params: { id } } = {}) {
    this.patientID = id;
  }
}

/**
 * Валидация входящих данных
 *
 * @param {string} patientID - UUID пациента
 * @returns {boolean}
 */
const isValid = (patientID) => validator.isUUID(patientID);

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
    let { patientID } = new FindResolutionDTO(req);

    if (patientID === 'false') {
      patientID = req.patientID;
    }

    if (!patientID) {
      throw new ApiError(400, 'PatientID is empty');
    }

    if (!isValid(patientID)) {
      throw new ApiError(400, 'PatientID does not valid');
    }

    req.data = patientID;
    next();
  } catch (error) {
    next(error);
  }
};
