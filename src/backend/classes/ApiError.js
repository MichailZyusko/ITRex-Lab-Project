export default class ApiError extends Error {
  constructor(statusCode = 500, message = 'Something went wrong') {
    super(message);
    this.name = ApiError.name;
    this.statusCode = statusCode;
  }
}
