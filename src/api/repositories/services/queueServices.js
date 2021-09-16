/* eslint-disable no-return-await */
/* eslint-disable no-plusplus */

import RedisStorage from '../storage/queueStorage.js';
import DatabaseStorage from '../../database/DatabaseStorage.js';

export default class Queue {
  constructor(storage) {
    this.storage = storage || new RedisStorage();
  }

  async addPatient(patientID, queueID) {
    try {
      return await this.storage.setPatient(patientID, queueID, new Date().getTime());
    } catch (error) {
      console.error(error);
    }
  }

  async getCurrentPatient(queueID) {
    try {
      const [patientID] = await this.storage.getCurrentPatient(queueID);
      return await DatabaseStorage.getPatientByID(patientID);
    } catch (error) {
      console.error(error);
    }
  }

  async deleteCurrentPatient(queueID) {
    try {
      return await this.storage.deleteCurrentPatient(queueID);
    } catch (error) {
      console.error(error);
    }
  }

  async isExistPatient(patientID, queueID) {
    try {
      if (await this.storage.isExistPatient(queueID, patientID)) {
        return true;
      }

      return false;
    } catch (error) {
      console.error(error);
    }
  }
}
