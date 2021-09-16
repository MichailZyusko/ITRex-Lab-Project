import controller from './controller.js';
import isExistPatientID from './isExistPatientID.js';
import isValidRequestData from './isValidRequestData.js';
import findDoctorSpecialization from './findDoctorSpecialization.js';
import findDoctorName from './findDoctorName.js';

class SetDiagnose {
  constructor() {
    this.controller = controller;
    this.findDoctorName = findDoctorName;
    this.findDoctorSpecialization = findDoctorSpecialization;
    this.isValidRequestData = isValidRequestData;
    this.isExistPatientID = isExistPatientID;
  }
}

export default new SetDiagnose();
