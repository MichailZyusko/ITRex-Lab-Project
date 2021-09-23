import database from '../../../database/index.js';

/**
 * Контроллер для получения пациента по его id
 *
 * @param {string} patientID - UUID пациента
 * @param {object} res - объект ответа
 * @param {function} next - следующая функция промежуточной обработки
 * @returns {Promise<void>}
 */

export default async ({ data: patientID }, res, next) => {
  try {
    const patient = await database.getPatientByID(patientID);

    res.status(200).send(patient);
  } catch (error) {
    console.error(error);
    next(error);
  }
};
