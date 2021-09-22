import redis from 'redis';
import bluebird from 'bluebird';
import config from '../../../config.js';

const { redis: { port, host } } = config;

bluebird.promisifyAll(redis);

export default class RedisStorage {
  /**
   * Создает экземпляр redisStorage
   *
   * @constructor
   * @param {object} redisClient - redisClient
   */
  constructor(redisClient) {
    this.redisClient = redisClient || redis.createClient(port, host);
  }

  /**
   * Добавляет пациента в очередь в redisClient
   *
   * @param {string} patientID -UUID пациента
   * @param {string} queueID - UUID очереди к врачу
   * @param {number} recordTime - Время записи к доктору в мс.
   * @returns {Promise<*>}
   */
  async setPatient(patientID, queueID, recordTime) {
    const result = await this.redisClient.zaddAsync(`queues:${queueID}`, 'NX', recordTime, patientID);
    return result;
  }

  /**
   * Возвращает первого пациента из очереди из redisClient
   *
   * @param {string} queueID - UUID очереди к врачу
   * @returns {Promise<*>}
   */
  async getCurrentPatient(queueID) {
    const result = await this.redisClient.zrangeAsync(`queues:${queueID}`, 0, 0);
    return result;
  }

  /**
   * Удаляет первого пациента в очереди в redisClient
   *
   * @param {string} queueID - UUID очереди к врачу
   * @returns {Promise<*>}
   */
  async deleteCurrentPatient(queueID) {
    const result = await this.redisClient.zpopminAsync(`queues:${queueID}`);
    return result;
  }

  /**
   * Возвращает длину очереди с queueID
   *
   * @param {string} queueID - UUID очереди к врачу
   * @returns {Promise<*>}
   */
  async getQueueLength(queueID) {
    const result = await this.redisClient.zcardAsync(`queues:${queueID}`);
    return result;
  }

  /**
   * Проверяет наличие пациента с patientID в очереди с queueID в redisClient
   *
   * @param {string} patientID - UUID пациента
   * @param {string} queueID - UUID очереди к врачу
   * @returns {Promise<*>}
   */
  async isExistPatient(queueID, patientID) {
    const result = await this.redisClient.zscoreAsync(`queues:${queueID}`, patientID);
    return result;
  }
}
