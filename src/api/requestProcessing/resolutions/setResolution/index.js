/* eslint-disable class-methods-use-this */

import controller from './controller.js';
import isExistClient from './isExistClient.js';
import isValidQueryParams from './isValidQueryParams.js';

class SetDiagnose {
  controller(req, res, next) {
    return controller(req, res, next);
  }

  isValidQueryParams(req, res, next) {
    return isValidQueryParams(req, res, next);
  }

  isExistClient(req, res, next) {
    return isExistClient(req, res, next);
  }
}

export default new SetDiagnose();
