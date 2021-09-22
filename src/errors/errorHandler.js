import ApiError from './ApiError.js';

/**
 * Отлавливает ошибки и возвращает их на сторону клиента
 *
 * @param {object} err - объект ошибки
 * @param {object} req - объект request
 * @param {object} res - объект response
 *
 */

export default (err, req, res) => {
  let message = 'Something went wrong';
  let status = 500;

  if (err instanceof ApiError) {
    message = err.message;
    status = err.statusCode;
  }

  if (status === 401) {
    return res.redirect('http://localhost:3000/patient-sign-in');
  }

  res.status(status).send({ code: status, message });
};
