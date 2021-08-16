/* eslint-disable prefer-destructuring,import/no-cycle */
// TODO поясни пожалуйста про эти(вверху) жалобы линтера. Я гуглил, но немного не понял

// Значения по умолчания запихнуть в конфиг файл
// Добавить везде try/catch

export default class Queue {
  constructor(data = null) {
    this.storage = data;
    this.nextClient = null;
    this.currentClient = null;
  }

  async getClients() {
    return Array
      .from(await this.storage.values())
      .map((item) => JSON.parse(item))
      .sort((a, b) => a.ID - b.ID);
  }

  async addClient(ID, item) {
    return this.storage.set(+ID, JSON.stringify(item));
  }

  async deleteClient(ID) {
    const client = JSON.parse(await this.storage.get(+ID));

    if (!client) {
      return { result: 'Nothing was found for your query' };
    }

    await this.storage.delete(+ID);
    return { result: client };
  }

  async findClient(ID) {
    try {
      const client = JSON.parse(await this.storage.get(+ID));

      if (!client?.diagnose) {
        return { result: 'Nothing was found for your query' };
      }

      return { result: client };
    } catch (e) {
      console.log(e);
      return { result: 'Nothing was found for your query' };
    }
  }

  async setDiagnose(ID, diagnose) {
    try {
      const client = JSON.parse(await this.storage.get(+ID));

      if (!client) {
        return { result: 'Nothing was found for your query' };
      }

      client.diagnose = diagnose.value;
      client.TTL = diagnose.TTL;
      await this.storage.set(+ID, JSON.stringify(client));

      return { result: client };
    } catch (e) {
      console.log(e);
      return { result: 'Nothing was found for your query' };
    }
  }

  async callNextClient() {
    const incomingQueue = Array
      .from(await this.storage.values())
      .map((item) => JSON.parse(item))
      .filter((item) => !item?.diagnose)
      .sort((a, b) => a.ID - b.ID);

    const queueLength = incomingQueue.length;

    if (queueLength === 0) {
      this.currentClient = null;
      this.nextClient = null;
    } else if (queueLength === 1) {
      this.currentClient = incomingQueue[0];
      this.nextClient = null;
    } else {
      this.currentClient = incomingQueue[0];
      this.nextClient = incomingQueue[1];
    }

    const { currentClient, nextClient } = this;

    return { currentClient, nextClient, queueLength };
  }
}
