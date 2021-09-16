import redis from 'redis';
import bluebird from 'bluebird';
import config from '../../../config.js';

const { redis: { port, host } } = config;

bluebird.promisifyAll(redis);

export default class RedisStorage {
  constructor(redisClient) {
    this.redisClient = redisClient || redis.createClient(port, host);
  }

  async setPatient(patientID, queueID, count) {
    return await this.redisClient.zaddAsync(`queues:${queueID}`, 'NX', count, patientID);
  }

  async getCurrentPatient(queueID) {
    return await this.redisClient.zrangeAsync(`queues:${queueID}`, 0, 0);
  }

  async deleteCurrentPatient(queueID) {
    return await this.redisClient.zpopminAsync(`queues:${queueID}`);
  }

  async getQueueLength(queueID) {
    return await this.redisClient.zcardAsync(`queues:${queueID}`);
  }

  async isExistPatient(queueID, patientID) {
    return await this.redisClient.zscoreAsync(`queues:${queueID}`, patientID);
  }
}
