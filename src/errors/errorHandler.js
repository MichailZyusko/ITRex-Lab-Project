/* eslint-disable no-unused-vars */

import { ApiError } from '../api/classes/index.js';

export default (err, req, res, next) => {
  let message = 'Something went wrong';
  let status = 500;

  if (err instanceof ApiError) {
    message = err.message;
    status = err.statusCode;
  }

  res.status(status).send({ code: status, message });
  // Когда-нибудь добавлю страницы ошибки с ejs
  // res.status(status).send({ redirectURL: `/html/errorPage/${status}.html` });
};
