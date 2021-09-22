import ApiError from '../../../../../errors/ApiError.js';
import DatabaseStorage from '../../../../database/index.js';

/**
 * Проверка на существование пользователя
 *
 * @param {object} patient - объект пациента
 * @returns {Promise<boolean>}
 */
const isExist = async (patient) => DatabaseStorage.isExistPatient(patient);

/**
 * Middleware для проверки существования пользователя
 *
 * @param {object} patient - объект пациента
 * @param {object} res - объект ответа
 * @param {function} next - следующая функция промежуточной обработки
 * @returns {Promise<void>}
 */
export default async ({ data: patient }, res, next) => {
  try {
    if (await isExist(patient)) {
      throw new ApiError(404, 'This patient already exist');
    }

    next();
  } catch (error) {
    next(error);
  }
};
