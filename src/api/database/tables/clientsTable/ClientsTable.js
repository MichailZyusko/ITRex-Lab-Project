/* eslint-disable no-return-await */
/* eslint-disable class-methods-use-this */

import {
  setPatient, getPatientByID,
  isExistPatient,
  getAllPatientLikeValue,
} from './index.js';

class ClientsTable {
  async setPatient(patient) {
    return await setPatient(patient);
  }

  async isExistPatient(patient) {
    return await isExistPatient(patient);
  }

  async getAllPatientLikeValue(text) {
    return await getAllPatientLikeValue(text);
  }

  async getPatientByID(ID) {
    const result = await getPatientByID(ID);
    console.log(result);
    return result;
  }
}

export default new ClientsTable();
