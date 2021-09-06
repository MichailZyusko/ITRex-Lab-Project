/* eslint-disable class-methods-use-this */

import controller from './controller.js';
import isExistClient from './isExistClient.js';
import isValidPatientData from './isValidPatientData.js';

class SignUp {
  controller(req, res, next) {
    return controller(req, res, next);
  }

  isValidPatientData(req, res, next) {
    return isValidPatientData(req, res, next);
  }

  isExistClient(req, res, next) {
    return isExistClient(req, res, next);
  }
}

export default new SignUp();
