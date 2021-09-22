import validator from 'validator';
import ApiError from '../../../../errors/ApiError.js';

class AddPatientDto {
  /**
   * DTO для получения данных из req
   *
   * @constructor
   * @param {string} patientID - UUID пациента
   * @param {string} doctorID - UUID доктора
   * @param {number} recordTime - Время записи в мс.
   */
  constructor({ patientID, query: { doctorID }, body: { recordTime } } = {}) {
    this.patientID = patientID;
    this.doctorID = doctorID;
    this.recordTime = recordTime;
  }
}

/**
 * Валидация входящих данных
 *
 * @param {string} patientID - UUID пациента
 * @param {string} doctorID - UUID доктора
 * @returns {boolean}
 */
const isValid = (patientID, doctorID) => validator.isUUID(patientID)
  && validator.isUUID(doctorID);

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
    const { patientID, doctorID, recordTime } = new AddPatientDto(req);

    if (!(patientID && doctorID && recordTime)) {
      throw new ApiError(400, 'Bad request');
    }

    if (!isValid(patientID, doctorID)) {
      throw new ApiError(400, 'Not valid form data');
    }

    req.data = {
      patientID,
      doctorID,
      recordTime,
    };
    next();
  } catch (error) {
    next(error);
  }
};
