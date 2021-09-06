/* eslint-disable class-methods-use-this */

import getController from './get/controller.js';
import deleteController from './delete/controller.js';

class CurrentClient {
  deleteController(req, res, next) {
    return deleteController(req, res, next);
  }

  getController(req, res, next) {
    return getController(req, res, next);
  }
}

export default new CurrentClient();
