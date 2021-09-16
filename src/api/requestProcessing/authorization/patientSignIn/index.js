/* eslint-disable class-methods-use-this */

import controller from './controller.js';
import isValidPasswordLogin from './isValidPasswordLogin.js';

class PatientSignIn {
  controller(req, res, next) {
    return controller(req, res, next);
  }

  isValidPasswordLogin(req, res, next) {
    return isValidPasswordLogin(req, res, next);
  }
}

export default new PatientSignIn();
