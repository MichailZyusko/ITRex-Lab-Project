import validator from 'validator';
import ApiError from '../../../../errors/ApiError.js';
import config from '../../../../../config.js';

class SetDiagnoseDTO {
  /**
   * DTO для получения данных из req
   *
   * @constructor
   * @param {string} value - Текст резолюции
   * @param {number} TTL - Время в мс. установленное доктором
   * @param {string} ID - UUID пациента
   * @param {string} doctorID - UUID доктора
   * @param {number} defaultTTL - Время по умолчанию для время жизни резолюции
   */
  constructor({ body: { value, TTL }, params: { id: ID }, doctorID }, defaultTTL) {
    this.resolution = value;
    this.TTL = new Date((TTL || new Date().getTime() + defaultTTL));
    this.ID = ID;
    this.doctorID = doctorID;
  }
}

/**
 * Валидация входящих данных
 *
 * @param {string} diagnose - текст резолюции, поставленный доктором
 * @param {string} ID - UUID пациента, которому поставили резолюцию
 * @param {Date} TTL - Time To Life для резолюции
 * @param {string} doctorID - UUID доктора
 * @returns {boolean}
 */
const isValid = (diagnose, ID, TTL, doctorID) => validator.isAlpha(diagnose)
  && validator.isUUID(ID)
  && validator.isDate(TTL)
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
    const { TTL: defaultTTL } = config;
    const {
      resolution, TTL, ID, doctorID,
    } = new SetDiagnoseDTO(req, defaultTTL);

    if (!(resolution && ID && TTL && doctorID)) {
      throw new ApiError(400, 'Invalid request body');
    }

    if (!isValid(resolution, ID, TTL, doctorID)) {
      throw new ApiError(400, 'Not valid diagnose');
    }

    req.data = {
      TTL,
      resolution,
      ID,
      doctorID,
    };
    next();
  } catch (error) {
    next(error);
  }
};
