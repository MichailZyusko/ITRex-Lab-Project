/* eslint-disable no-return-await */
/* eslint-disable class-methods-use-this */

import { addRecord, getQueueList } from './index.js';

class QueuesTable {
  async addRecord(queueID, clientID, recordTime) {
    return await addRecord(queueID, clientID, recordTime);
  }

  async getQueueList() {
    return await getQueueList();
  }
}

export default new QueuesTable();
