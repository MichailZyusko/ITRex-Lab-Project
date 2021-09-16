import {
  setPatient, getPatientByID,
  isExistPatient,
  getAllPatientLikeValue,
} from './index.js';

class ClientsTable {
  constructor() {
    this.setPatient = setPatient;
    this.getAllPatientLikeValue = getAllPatientLikeValue;
    this.getPatientByID = getPatientByID;
    this.isExistPatient = isExistPatient;
  }
}

export default new ClientsTable();
