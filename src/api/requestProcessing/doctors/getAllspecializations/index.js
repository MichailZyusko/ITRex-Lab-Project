/* eslint-disable class-methods-use-this */

import controller from './controller.js';

class GetAllSpecializations {
  controller(req, res, next) {
    return controller(req, res, next);
  }
}

export default new GetAllSpecializations();
