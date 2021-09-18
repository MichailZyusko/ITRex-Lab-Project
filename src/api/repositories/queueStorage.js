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
    const result = await this.redisClient.zaddAsync(`queues:${queueID}`, 'NX', count, patientID);
    return result;
  }

  async getCurrentPatient(queueID) {
    const result = await this.redisClient.zrangeAsync(`queues:${queueID}`, 0, 0);
    return result;
  }

  async deleteCurrentPatient(queueID) {
    const result = await this.redisClient.zpopminAsync(`queues:${queueID}`);
    return result;
  }

  async getQueueLength(queueID) {
    const result = await this.redisClient.zcardAsync(`queues:${queueID}`);
    return result;
  }

  async isExistPatient(queueID, patientID) {
    const result = await this.redisClient.zscoreAsync(`queues:${queueID}`, patientID);
    return result;
  }
}
