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
      .sort((a, b) => a.ID - b.ID);
  }

  async addClient(ID, item) {
    return this.storage.set(ID, item);
  }

  async deleteClient(ID) {
    const client = await this.storage.get(+ID);
    notFound(client);

    await this.storage.delete(+ID);
    return { result: client };
  }

  async findClient(ID) {
    try {
      const client = await this.storage.get(+ID);

      if (!client.diagnose) {
        // throw new ApiError (204,'Nothing was found for your query' );
        return { result: 'Nothing was found for your query' };
      }

      return { result: client };
    } catch (e) {
      console.log(e);
      return { result: 'Nothing was found for your query' };
    }
  }

  async setDiagnose(ID, diagnose, TTL) {
    try {
      const client = await this.storage.get(+ID);
      notFound(client);

      client.diagnose = diagnose;
      client.TTL = TTL;

      await this.storage.set(+ID, client);
      await this.storage.setTTL(+ID, TTL);

      return { result: client };
    } catch (e) {
      console.log(e);
      return { result: 'Nothing was found for your query' };
    }
  }

  async callNextClient() {
    const incomingQueue = Array
      .from(await this.storage.values())
      .filter(({ diagnose }) => !diagnose)
      .sort((a, b) => a.ID - b.ID);

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
