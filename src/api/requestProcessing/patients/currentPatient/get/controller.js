import queue from '../../../../../storage/index.js';

/**
 * Контроллер для получения текущего пациента из очереди
 *
 * @param {object} req - объект запроса
 * @param {object} res - объект ответа
 * @param {function} next - следующая функция промежуточной обработки
 * @returns {Promise<void>}
 */
export default async (req, res, next) => {
  try {
    res.status(200).send(await queue.getCurrentPatient(req.data));
  } catch (error) {
    console.error(error);
    next(error);
  }
};
