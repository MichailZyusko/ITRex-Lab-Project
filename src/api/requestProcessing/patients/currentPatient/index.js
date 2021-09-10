/* eslint-disable class-methods-use-this */

import getController from './get/controller.js';
import deleteController from './delete/controller.js';
import isValidDoctorData from './isValidDoctorData/isValidDoctorData.js';
import findDoctorQueueID from './findDoctorQueueID/findDoctorQueueID.js';

class CurrentClient {
  deleteController(req, res, next) {
    return deleteController(req, res, next);
  }

  isValidDoctorData(req, res, next) {
    return isValidDoctorData(req, res, next);
  }

  getController(req, res, next) {
    return getController(req, res, next);
  }

  findDoctorQueueID(req, res, next) {
    return findDoctorQueueID(req, res, next);
  }
}

export default new CurrentClient();
