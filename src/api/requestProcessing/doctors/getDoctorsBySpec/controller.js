import database from '../../../database/index.js';

/**
 * Контроллер для получения докторов по их специализации
 *
 * @param {string} specializationID - UUID специализации доктора
 * @param {object} res - объект ответа
 * @param {function} next - следующая функция промежуточной обработки
 * @returns {Promise<void>}
 */
export default async ({ data: specializationID }, res, next) => {
  try {
    const doctors = await database.getDoctorsBySpecID(specializationID);

    res.send(doctors);
  } catch (error) {
    console.error(error);
    next(error);
  }
};
