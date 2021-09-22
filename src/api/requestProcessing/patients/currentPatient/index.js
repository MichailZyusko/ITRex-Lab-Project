import getController from './get/controller.js';
import deleteController from './delete/controller.js';
import isValidDoctorData from './isValidDoctorData.js';

class CurrentClient {
  constructor() {
    this.deleteController = deleteController;
    this.getController = getController;
    this.isValidDoctorData = isValidDoctorData;
  }
}

export default new CurrentClient();
