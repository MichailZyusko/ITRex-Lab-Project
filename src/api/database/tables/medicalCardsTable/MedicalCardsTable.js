/* eslint-disable no-return-await */
/* eslint-disable class-methods-use-this */

import { addRecord, getAllRecords } from './index.js';

class MedicalCardsTable {
  async addRecord(key, medicalCardID) {
    return await addRecord(key, medicalCardID);
  }

  async getAllRecords(patientID) {
    return await getAllRecords(patientID);
  }
}

export default new MedicalCardsTable();
