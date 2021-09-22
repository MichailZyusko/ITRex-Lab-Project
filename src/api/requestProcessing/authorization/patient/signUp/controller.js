import DatabaseStorage from '../../../../database/index.js';

/**
 * Контроллер для авторизации
 *
 * @param {object} patient - объект пациента
 * @param {object} res - объект ответа
 * @param {function} next - следующая функция промежуточной обработки
 * @returns {Promise<void>}
 */

export default async ({ data: patient }, res, next) => {
  try {
    await DatabaseStorage.setPatient(patient);

    res.redirect('http://localhost:3000/patient-sign-in/');
  } catch (error) {
    console.error(error);
    next(error);
  }
};
