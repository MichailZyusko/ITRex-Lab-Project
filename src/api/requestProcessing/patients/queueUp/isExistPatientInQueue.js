import queue from '../../../../storage/index.js';
import ApiError from '../../../../errors/ApiError.js';

/**
 * Проверка на существование пациента в очереди
 *
 * @param {string} patientID - UUID пациента
 * @param {string} queueID - UUID очереди
 * @returns {Promise<boolean>}
 */
const isExistInQueue = async (patientID, queueID) => {
  const result = await queue.isExistPatient(patientID, queueID);
  return result;
};

/**
 * Middleware для проверки существования пациента в очереди
 *
 * @param {string} patientID - UUID пациента
 * @param {string} doctorID - UUID доктора
 * @param {object} res - объект ответа
 * @param {function} next - следующая функция промежуточной обработки
 * @returns {Promise<void>}
 */
export default async ({ data: { patientID, doctorID: queueID } }, res, next) => {
  try {
    if (await isExistInQueue(patientID, queueID)) {
      throw new ApiError(400, 'I\'m sorry, but at this moment you are already in the queue');
    }

    next();
  } catch (error) {
    next(error);
  }
};
