import controller from './controller.js';
import isExistPatient from './isExistPatient.js';
import isValidPatientData from './isValidPatientData.js';

class SignUp {
  constructor() {
    this.controller = controller;
    this.isExistPatient = isExistPatient;
    this.isValidPatientData = isValidPatientData;
  }
}

export default new SignUp();
