import validator from 'validator';
import ApiError from '../../../../errors/ApiError.js';

/**
 * Валидация входящих данных
 *
 * @param {string} doctorID - UUID доктора
 * @returns {boolean}
 */
const isValid = (doctorID) => validator.isUUID(doctorID);

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
    const { doctorID } = req;

    if (!doctorID) {
      throw new ApiError(400, 'DoctorID is empty');
    }

    if (!isValid(doctorID)) {
      throw new ApiError(400, 'Not valid doctorID');
    }

    req.data = doctorID;
    next();
  } catch (error) {
    next(error);
  }
};
