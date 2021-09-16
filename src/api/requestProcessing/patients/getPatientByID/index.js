import controller from './controller.js';
import isValidPatientID from './isValidPatientID.js';

class GetPatientByID {
  constructor() {
    this.controller = controller;
    this.isValidPatientID = isValidPatientID;
  }
}

export default new GetPatientByID();
