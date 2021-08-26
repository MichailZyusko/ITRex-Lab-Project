/* eslint-disable no-param-reassign */

import { v4 as uuidv4 } from 'uuid';
import notFound from '../../errors/notFound.js';
// import ApiError from './ApiError.js';
// Добавить везде try/catch
// throw new Error

export default class Queue {
  constructor(data = null) {
    this.storage = data;
    this.nextClient = null;
    this.currentClient = null;
  }

  async getClients() {
    return Array
      .from(await this.storage.values())
      .sort((a, b) => a.recordTime - b.recordTime);
  }

  async getResolutions() {
    return this.storage.getResolutions();
  }

  // async TTL(map) {
  //   return this.storage.TTL(map);
  // }

  async addClient(client) {
    const doctorID = '9e1de935-9df7-4dff-91f5-edf973c9d84';

    client.clientID = uuidv4();
    client.recordTime = new Date();
    return this.storage.set(client, doctorID);
  }

  async deleteClient(searchClient) {
    const client = await this.storage.get(searchClient);
    notFound(client);

    await this.storage.delete(searchClient);
    return { result: client };
  }

  async findClient(searchClient) {
    try {
      const client = await this.storage.get(searchClient);
      // TODO Тут я потом добавлю throw new Error в методу findClient чтобы убрать if

      // if (!client.diagnose) {
      //   // throw new ApiError (204,'Nothing was found for your query' );
      //   return { result: 'Nothing was found for your query' };
      // }

      return { result: client };
    } catch (e) {
      console.log(e);
      return { result: 'Nothing was found for your query' };
    }
  }

  async setDiagnose(ID, diagnose, TTL) {
    try {
      await this.storage.setDiagnose(ID, diagnose, TTL);

      return 'OK';
    } catch (e) {
      console.log(e);
      return { result: 'Nothing was found for your query' };
    }
  }

  async callNextClient() {
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
  }
}
