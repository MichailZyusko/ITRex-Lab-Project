/* eslint-disable class-methods-use-this */

import controller from './controller.js';
import isValidParams from './isValidParams.js';

class GetAllResolutionsByID {
  controller(req, res, next) {
    return controller(req, res, next);
  }

  isValidParams(req, res, next) {
    return isValidParams(req, res, next);
  }
}

export default new GetAllResolutionsByID();
