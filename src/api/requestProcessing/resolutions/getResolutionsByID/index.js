import controller from './controller.js';
import isValidPatientID from './isValidPatientID.js';

class GetAllResolutionsByID {
  constructor() {
    this.controller = controller;
    this.isValidPatientID = isValidPatientID;
  }
}

export default new GetAllResolutionsByID();
