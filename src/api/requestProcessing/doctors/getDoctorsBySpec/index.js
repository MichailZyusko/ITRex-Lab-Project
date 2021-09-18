import controller from './controller.js';
import isValidSpecID from './isValidSpecID.js';

class GetDoctorsBySpec {
  constructor() {
    this.controller = controller;
    this.isValidSpecID = isValidSpecID;
  }
}

export default new GetDoctorsBySpec();
