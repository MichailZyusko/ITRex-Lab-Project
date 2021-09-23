import database from '../../../database/index.js';

/**
 * Контроллер для получения пациентов
 *
 * @param {string} data - текст для полнотекстового поиска
 * @param {object} res - объект ответа
 * @param {function} next - следующая функция промежуточной обработки
 * @returns {Promise<void>}
 */
export default async ({ data }, res, next) => {
  try {
    const allPatients = await database.getAllPatientLikeValue(data);
    res.status(200).send(allPatients);
  } catch (error) {
    console.error(error);
    next(error);
  }
};
