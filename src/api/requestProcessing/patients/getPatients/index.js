import controller from './controller.js';
import isValidSearchingParams from './isValidSearchingParams.js';

class GetAllPatient {
  constructor() {
    this.controller = controller;
    this.isValidSearchingParams = isValidSearchingParams;
  }
}

export default new GetAllPatient();
