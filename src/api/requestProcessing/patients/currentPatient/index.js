import getController from './get/controller.js';
import deleteController from './delete/controller.js';
import isValidDoctorData from './isValidDoctorData/isValidDoctorData.js';
import findDoctorQueueID from './findDoctorQueueID/findDoctorQueueID.js';

class CurrentClient {
  constructor() {
    this.deleteController = deleteController;
    this.findDoctorQueueID = findDoctorQueueID;
    this.getController = getController;
    this.isValidDoctorData = isValidDoctorData;
  }
}

export default new CurrentClient();
