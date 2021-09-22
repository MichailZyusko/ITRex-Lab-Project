import database from '../../../database/index.js';

/**
 * Контроллер для получения пациента по его ID
 * @param {string} patientID - UUID пациента
 * @param {object} res - объект ответа
 * @param {function} next - следующая функция промежуточной обработки
 * @returns {Promise<void>}
 */
export default async ({ data: patientID }, res, next) => {
  try {
    res.send(await database.getResolutionsByID(patientID));
  } catch (error) {
    console.error(error);
    next(error);
  }
};
