/* eslint-disable no-return-await */

import redis from 'redis';
import bluebird from 'bluebird';
import config from '../../../config.js';

const { redis: { port, host } } = config;

bluebird.promisifyAll(redis);

class RedisStorage {
  constructor() {
    this.data = redis.createClient(port, host);
  }

  async setPatient(patientID, queueID, count) {
    return await this.data.zaddAsync(`queues:${queueID}`, 'NX', count, patientID);
  }

  async getCurrentPatient(queueID) {
    return await this.data.zrangeAsync(`queues:${queueID}`, 0, 0);
  }

  async deleteCurrentPatient(queueID) {
    return await this.data.zpopminAsync(`queues:${queueID}`);
  }

  async getQueueLengt(queueID) {
    return await this.data.zcardAsync(`queues:${queueID}`);
  }

  async isExistPatient(queueID, patientID) {
    return await this.data.zscoreAsync(`queues:${queueID}`, patientID);
  }

  async getPopsitionInQueue(queueID) {
    return await this.data.zrangebyscoreAsync(`queues:${queueID}`, -Infinity, +Infinity);
  }
}

export default new RedisStorage();
