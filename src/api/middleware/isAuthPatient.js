/**
 * Middleware для проверки авторизации пациента
 *
 * @param {object} req - объект запроса
 * @param {object} res - объект ответа
 * @param {function} next - следующая функция промежуточной обработки
 * @returns {*}
 */

export default (req, res, next) => {
  try {
    const { patientToken } = req.cookies;

    if (!patientToken) {
      return res
        .status(302)
        .send({ url: '/patient-sign-in/' });
    }
    next();
  } catch (error) {
    next(error);
  }
};
