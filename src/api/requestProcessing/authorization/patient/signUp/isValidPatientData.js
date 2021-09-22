import validator from 'validator';
import ApiError from '../../../../../errors/ApiError.js';

class SetDiagnoseDTO {
  /**
   * DTO для получения данных из req
   *
   * @constructor
   * @param {object} patient - данные пациента, введенные при регистрации
   */
  constructor({ body: { username: patient } }) {
    this.patientDTO = patient;
  }
}

/**
 * Валидация входных данных пользователя
 *
 * @param {object} patient - данные пациента, введенные при регистрации
 * @returns {boolean}
 */
const isValid = (patient) => validator.isAlpha(patient.firstName)
  && validator.isAlpha(patient.lastName)
  && validator.isAlpha(patient.gender)
  && validator.isEmail(patient.email)
  && !validator.isEmpty(patient.birthday);

/**
 * Middleware для валидации входящих данных
 *
 * @param {object} req - объект запроса
 * @param {object} res - объект ответа
 * @param {function} next - следующая функция промежуточной обработки
 * @returns {Promise<void>}
 */
export default async (req, res, next) => {
  try {
    const { patientDTO } = new SetDiagnoseDTO(req);

    const [firstName, lastName, birthday, gender, email, password] = patientDTO;
    const patient = {
      firstName,
      lastName,
      birthday,
      gender,
      email,
      password,
    };

    if (!patient) {
      throw new ApiError(400, 'Empty patient data');
    }

    if (!isValid(patient)) {
      throw new ApiError(400, 'Not valid patient data');
    }

    req.data = patient;
    next();
  } catch (error) {
    next(error);
  }
};
