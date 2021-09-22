export default class ApiError extends Error {
  /**
   * Создает экземпляр ApiError.
   *
   * @constructor
   * @this  {Error}
   * @param {number} statusCode - Статус ошибки.
   * @param {string} message - Сообщение ошибки.
   */

  constructor(statusCode = 500, message = 'Something went wrong') {
    super(message);

    /** @public */
    this.name = ApiError.name;

    /** @public */
    this.statusCode = statusCode;
  }
}
