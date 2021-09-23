import database from '../../../database/index.js';

/**
 * Контроллер для получения специализаций врача
 *
 * @param {object} req - объект запроса
 * @param {object} res - объект ответа
 * @param {function} next - следующая функция промежуточной обработки
 * @returns {Promise<void>}
 */
export default async (req, res, next) => {
  try {
    const specializations = await database.getAllSpecializations();

    res.status(200).send(specializations);
  } catch (error) {
    console.error(error);
    next(error);
  }
};
