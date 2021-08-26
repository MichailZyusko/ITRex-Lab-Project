/* eslint-disable class-methods-use-this */

import controller from './controller.js';
import IsExistID from './isExistID.js';
import IsValidDiagnose from './isValidDiagnose.js';

class SetDiagnose {
  controller(req, res, next) {
    return controller(req, res, next);
  }

  isValidID(req, res, next) {
    return IsValidDiagnose(req, res, next);
  }

  isExistID(req, res, next) {
    return IsExistID(req, res, next);
  }
}

export default new SetDiagnose();
