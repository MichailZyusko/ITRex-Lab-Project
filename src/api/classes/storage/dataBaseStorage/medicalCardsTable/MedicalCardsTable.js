/* eslint-disable no-return-await */
/* eslint-disable class-methods-use-this */

import { addRecord, updateRecord, delResolution } from './index.js';

class MedicalCardsTable {
  async addRecord(key, doctorID, diagnose, comingDate, TTL) {
    return await addRecord(key, doctorID, diagnose, comingDate, TTL);
  }

  async updateRecord(key, diagnose, TTL) {
    return await updateRecord(key, diagnose, TTL);
  }

  async delResolution(key) {
    return await delResolution(key);
  }
}

export default new MedicalCardsTable();
