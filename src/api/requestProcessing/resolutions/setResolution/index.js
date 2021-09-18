import controller from './controller.js';
import isExistPatientID from './isExistPatientID.js';
import isValidRequestData from './isValidRequestData.js';

class SetDiagnose {
  constructor() {
    this.controller = controller;
    this.isValidRequestData = isValidRequestData;
    this.isExistPatientID = isExistPatientID;
  }
}

export default new SetDiagnose();
