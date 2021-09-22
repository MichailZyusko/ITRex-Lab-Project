import RedisStorage from '../repositories/queueStorage.js';
import DatabaseStorage from '../database/index.js';

export default class Queue {
  /**
   * Создает экземпляр Queue.
   *
   * @constructor
   * @param {object} storage - redisClient
   */
  constructor(storage) {
    this.storage = storage || new RedisStorage();
  }

  /**
   * Добавляет пациента в очередь
   *
   * @param {string} patientID -UUID пациента
   * @param {string} queueID - UUID очереди к врачу
   * @param {number} recordTime - Время записи к доктору в мс.
   * @returns {Promise<*>}
   */
  async addPatient(patientID, queueID, recordTime) {
    try {
      return await this.storage.setPatient(patientID, queueID, recordTime);
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * Возвращает первого пациента из очереди
   *
   * @param {string} queueID - UUID очереди к врачу
   * @returns {Promise<*>}
   */
  async getCurrentPatient(queueID) {
    try {
      const [patientID] = await this.storage.getCurrentPatient(queueID);
      return await DatabaseStorage.getPatientByID(patientID);
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * Удаляет первого пациента в очереди
   *
   * @param {string} queueID - UUID очереди к врачу
   * @returns {Promise<*>}
   */
  async deleteCurrentPatient(queueID) {
    try {
      return await this.storage.deleteCurrentPatient(queueID);
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * Проверяет наличие пациента с patientID в очереди с queueID
   *
   * @param {string} patientID - UUID пациента
   * @param {string} queueID - UUID очереди к врачу
   * @returns {Promise<boolean>}
   */
  async isExistPatient(patientID, queueID) {
    try {
      return !!(await this.storage.isExistPatient(queueID, patientID));
    } catch (error) {
      console.error(error);
    }
  }
}
