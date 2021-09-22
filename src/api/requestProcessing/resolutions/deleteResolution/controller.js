import DatabaseStorage from '../../../database/index.js';

/**
 * Контроллер для удаления резолюции
 *
 * @param {string} resolutionID - UUID резолюции
 * @param {object} res - объект ответа
 * @param {function} next - следующая функция промежуточной обработки
 * @returns {Promise<void>}
 */
export default async ({ data: resolutionID }, res, next) => {
  try {
    await DatabaseStorage.deleteResolutionByID(resolutionID);

    res.status(204).send();
  } catch (error) {
    console.error(error);
    next(error);
  }
};
