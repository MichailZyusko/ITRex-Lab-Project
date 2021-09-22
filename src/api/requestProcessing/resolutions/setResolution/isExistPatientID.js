import queue from '../../../../storage/index.js';
import ApiError from '../../../../errors/ApiError.js';

/**
 * Проверяет наличие пациента в очереди
 *
 * @param {string} key - UUID пациента
 * @returns {Promise<boolean>}
 */

const isExist = async (key) => !queue.isExistPatient(key);

/**
 * Middleware для проверки существование пациента в очереди
 *
 * @param {string} ID - UUID пациента
 * @param {object} res - объект ответа
 * @param {function} next - следующая функция промежуточной обработки
 * @returns {Promise<void>}
 */

export default async ({ data: { ID } }, res, next) => {
  try {
    if (await isExist(ID)) {
      throw new ApiError(404, 'This patient does not exist');
    }

    next();
  } catch (error) {
    next(error);
  }
};
