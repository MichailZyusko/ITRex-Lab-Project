import DatabaseStorage from '../../../../database/index.js';

/**
 * Контроллер для аутентификация
 *
 * @param {string} password - пароль пользователя
 * @param {string} login - логин пользователя
 * @param {object} res - объект ответа
 * @param {function} next - следующая функция промежуточной обработки
 * @returns {Promise<void>}
 */
export default async ({ data: { password, login } }, res, next) => {
  try {
    const result = await DatabaseStorage.findDoctorByLogin(password, login);

    if (result) {
      res
        .cookie('doctorToken', `${result.token}`, {
          path: '/',
          httpOnly: true,
          secure: true,
          sameSite: 'strict',
        })
        .redirect('http://localhost:3000/doctor');
    } else {
      res.status(401).send();
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
};
