import database from '../../../database/index.js';

/**
 * Контроллер для задания резолюции пациенту
 *
 * @param {string} resolution - текст резолюции
 * @param {string} ID - UUID пациента
 * @param {Date} TTL - Time To Life для резолюции
 * @param {string} doctorID - UUID доктора
 * @param {object} res - объект ответа
 * @param {function} next - следующая функция промежуточной обработки
 * @returns {Promise<void>}
 */
export default async ({
  data: {
    resolution, ID, TTL, doctorID,
  },
}, res, next) => {
  try {
    const comingDate = new Date().toISOString().slice(0, 19).replace('T', ' ');

    await database.setDiagnose(ID, doctorID, resolution, comingDate, TTL);
    const patient = await database.getPatientByID(ID);

    res.status(201).send(patient);
  } catch (error) {
    console.error(error);
    next(error);
  }
};
