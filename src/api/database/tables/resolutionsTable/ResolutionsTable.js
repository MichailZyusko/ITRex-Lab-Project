/* eslint-disable no-return-await */
/* eslint-disable class-methods-use-this */

import { addRecord, getResolutionByID, deleteResolutionByID } from './index.js';

class ResolutionsTable {
  async addRecord(resolutionID, medicalCardID,
    doctorID, diagnose, comingDate, TTL) {
    return await addRecord(resolutionID, medicalCardID,
      doctorID, diagnose, comingDate, TTL);
  }

  async getResolutionByID(resolutionID) {
    return await getResolutionByID(resolutionID);
  }

  async deleteResolutionByID(resolutionID) {
    return await deleteResolutionByID(resolutionID);
  }
}

export default new ResolutionsTable();
