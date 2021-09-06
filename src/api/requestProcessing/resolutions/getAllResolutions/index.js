/* eslint-disable class-methods-use-this */

import controller from './controller.js';
import isValidQueryParams from './isValidQueryParams.js';

class GetAllResolutions {
  controller(req, res, next) {
    return controller(req, res, next);
  }

  isValidQueryParams(req, res, next) {
    return isValidQueryParams(req, res, next);
  }
}

export default new GetAllResolutions();
