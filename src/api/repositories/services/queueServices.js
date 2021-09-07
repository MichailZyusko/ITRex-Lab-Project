/* eslint-disable no-return-await */
/* eslint-disable no-plusplus */

import { v4 as uuidv4 } from 'uuid';
import RedisStorage from '../storage/queueStorage.js';
import DatabaseStorage from '../../database/DatabaseStorage.js';

export default class Queue {
  constructor(queueID, storage) {
    this.storage = storage || new RedisStorage();
    this.queueID = queueID || uuidv4();
    this.count = 0;
  }

  async addPatient(patientID) {
    try {
      const result = await this.storage.setPatient(patientID, this.queueID, this.count + 1);
      if (result) {
        this.count++;
      }

      return result;
    } catch (error) {
      console.error(error);
    }
  }

  async getCurrentPatient() {
    try {
      const [patientID] = await this.storage.getCurrentPatient(this.queueID);
      return await DatabaseStorage.getPatientByID(patientID);
    } catch (error) {
      console.error(error);
    }
  }

  async deleteCurrentPatient() {
    try {
      return await this.storage.deleteCurrentPatient(this.queueID);
    } catch (error) {
      console.error(error);
    }
  }

  async isExistPatient(patientID) {
    try {
      if (await this.storage.isExistPatient(this.queueID, patientID)) {
        return true;
      }

      return false;
    } catch (error) {
      console.error(error);
    }
  }
}
