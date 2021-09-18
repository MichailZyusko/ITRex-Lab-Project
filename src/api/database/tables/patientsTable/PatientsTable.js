import {
  setPatient, getPatientByUserID, getPatientByID,
  isExistPatient, getAllPatientLikeValue,
} from './index.js';

class PatientsTable {
  constructor() {
    this.setPatient = setPatient;
    this.getAllPatientLikeValue = getAllPatientLikeValue;
    this.getPatientByUserID = getPatientByUserID;
    this.getPatientByID = getPatientByID;
    this.isExistPatient = isExistPatient;
  }
}

export default new PatientsTable();
