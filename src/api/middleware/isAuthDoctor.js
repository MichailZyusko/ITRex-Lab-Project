/**
 * Middleware для проверки авторизации доктора
 *
 * @param {object} req - объект запроса
 * @param {object} res - объект ответа
 * @param {function} next - следующая функция промежуточной обработки
 * @returns {*}
 */

export default (req, res, next) => {
  try {
    const { doctorToken } = req.cookies;

    if (!doctorToken) {
      return res
        .status(302)
        .send({ url: '/doctor-sign-in/' });
    }

    next();
  } catch (error) {
    next(error);
  }
};
