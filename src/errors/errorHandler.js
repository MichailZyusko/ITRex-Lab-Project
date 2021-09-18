import ApiError from './ApiError.js';

export default (err, req, res, next) => {
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
