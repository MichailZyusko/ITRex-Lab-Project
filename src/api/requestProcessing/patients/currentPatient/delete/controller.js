import queue from '../../../../../storage/index.js';

/**
 * Контроллер для удаления текущего пациента из очереди
 *
 * @param {object} req - объект запроса
 * @param {object} res - объект ответа
 * @param {function} next - следующая функция промежуточной обработки
 * @returns {Promise<void>}
 */
export default async (req, res, next) => {
  try {
    res.send(await queue.deleteCurrentPatient(req.data));
  } catch (error) {
    console.error(error);
    next(error);
  }
};
