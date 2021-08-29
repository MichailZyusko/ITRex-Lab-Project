/* eslint-disable no-param-reassign */

import ApiError from './ApiError.js';

export default class Queue {
  constructor(data = null) {
    this.storage = data;
    this.nextClient = null;
    this.currentClient = null;
  }

  async getClients() {
    try {
      return Array
        .from(await this.storage.values())
        .sort((a, b) => Date.parse(a.recordTime) - Date.parse(b.recordTime));
    } catch (error) {
      return this.storage.getResolutions();
    }
  }

  async getResolutions() {
    try {
      return await this.storage.getResolutions();
    } catch (error) {
      console.error(error);
    }
  }

  async getIncomingQueue() {
    try {
      return this.storage.getIncomingQueue();
    } catch (error) {
      console.error(error);
    }
  }

  async addClient(client) {
    try {
      const doctorID = '9e1de935-9df7-4dff-91f5-edf973c9d84';

      client.recordTime = new Date();
      return this.storage.set(client, doctorID);
    } catch (error) {
      console.error(error);
    }
  }

  async deleteClient(searchClient) {
    try {
      await this.storage.delete(searchClient);

      return 'OK';
    } catch (error) {
      console.error(error);
    }
  }

  async findClient(searchClient) {
    try {
      const resolution = await this.storage.get(searchClient);

      if (!resolution) {
        throw new ApiError(400, 'Nothing was found for your query');
      }

      return [resolution];
    } catch (error) {
      console.error(error);
      return error;
    }
  }

  async setDiagnose(ID, diagnose, TTL) {
    try {
      await this.storage.setDiagnose(ID, diagnose, TTL);

      return 'OK';
    } catch (error) {
      console.error(error);
      return { result: 'Nothing was found for your query' };
    }
  }

  async callNextClient() {
    try {
      const incomingQueue = await this.storage.values();
      const queueLength = incomingQueue.length;

      if (queueLength === 0) {
        this.currentClient = null;
        this.nextClient = null;
      } else if (queueLength === 1) {
        [this.currentClient] = incomingQueue;
        this.nextClient = null;
      } else {
        [this.currentClient] = incomingQueue;
        [, this.nextClient] = incomingQueue;
      }

      const { currentClient, nextClient } = this;

      return { currentClient, nextClient, queueLength };
    } catch (error) {
      console.error(error);
    }
  }
}
