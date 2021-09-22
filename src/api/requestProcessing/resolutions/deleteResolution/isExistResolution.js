import ApiError from '../../../../errors/ApiError.js';
import Database from '../../../database/index.js';

/**
 * Проверяет наличие резолюции
 *
 * @param {string} resolutionID - UUID резолюции
 * @returns {Promise<boolean>}
 */
const isExist = async (resolutionID) => !await Database.getResolutionByID(resolutionID);

/**
 * Middleware для проверки существования резолюции
 *
 * @param {string} resolutionID - UUID резолюции
 * @param {object} res - объект ответа
 * @param {function} next - следующая функция промежуточной обработки
 * @returns {Promise<void>}
 */
export default async ({ data: resolutionID }, res, next) => {
  try {
    if (await isExist(resolutionID)) {
      throw new ApiError(404, 'This resolution does not exist');
    }

    next();
  } catch (error) {
    next(error);
  }
};
