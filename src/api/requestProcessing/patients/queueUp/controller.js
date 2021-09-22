import queue from '../../../../storage/index.js';

/**
 * Контроллер для добавления пациента в очередь
 *
 * @param {string} patientID - UUID пациента
 * @param {string} queueID - UUID очереди
 * @param {number} recordTime - Время записи в мс.
 * @param {object} res - объект ответа
 * @param {function} next - следующая функция промежуточной обработки
 * @returns {Promise<void>}
 */
export default async ({ data: { patientID, doctorID: queueID, recordTime } }, res, next) => {
  try {
    await queue.addPatient(patientID, queueID, recordTime);
    const positionInQueue = await queue.storage.getQueueLength(queueID);

    res.status(201).send({ positionInQueue });
  } catch (error) {
    console.error(error);
    next(error);
  }
};
