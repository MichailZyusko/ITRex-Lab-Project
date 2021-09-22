class GetTokenDTO {
  /**
   * DTO для получения JWT из cookies
   *
   * @constructor
   * @param {string} patientToken - JWT token для пациента
   * @param {string} doctorToken - JWT token для доктора
   */
  constructor({ cookies: { patientToken, doctorToken } } = {}) {
    this.patientToken = patientToken;
    this.doctorToken = doctorToken;
  }
}

/**
 * Middleware для проверки авторизации
 *
 * @param {object} req - объект запроса
 * @param {object} res - объект ответа
 * @param {function} next - следующая функция промежуточной обработки
 * @returns {*}
 */

export default (req, res, next) => {
  try {
    const { patientToken, doctorToken } = new GetTokenDTO(req);

    if (!(patientToken || doctorToken)) {
      return res
        .status(302)
        .send({ url: '/patient-sign-in/' });
    }

    next();
  } catch (error) {
    next(error);
  }
};
