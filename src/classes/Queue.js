/* eslint-disable prefer-destructuring */

export default class Queue {
  constructor() {
    this.data = [];
    this.nextClient = null;
    this.currentClient = null;
  }

  addClient(item) {
    return this.data.push(item);
  }

  findClient(ID) {
    const client = this.data.find((item) => item.ID === +ID);

    if (!client?.diagnose) {
      return { result: 'Nothing was found for your query' };
    }

    return { result: client };
  }

  // Мб использовать array.filter???
  deleteClient(ID) {
    const deleteIndex = this.data.findIndex((item) => item.ID === +ID);

    if (deleteIndex === -1) {
      return { result: 'Nothing was found for your query' };
    }

    const client = this.data.splice(deleteIndex, 1);

    return { result: client };
  }

  setDiagnose(ID, diagnose) {
    const client = this.data.find((item) => item.ID === +ID);

    if (!client) {
      return { result: 'Nothing was found for your query' };
    }

    client.diagnose = diagnose.value;
    client.TTL = diagnose.TTL;

    return { result: client };
  }

  callNextClient() {
    const incomingQueue = this.data.filter((item) => !item?.diagnose);
    const queueLength = incomingQueue.length;

    switch (queueLength) {
      case 0:
        this.currentClient = null;
        this.nextClient = null;
        break;
      case 1:
        this.currentClient = incomingQueue[0];
        this.nextClient = null;
        break;
      default:
        this.currentClient = incomingQueue[0];
        this.nextClient = incomingQueue[1];
        break;
    }

    const { currentClient, nextClient } = this;

    return { currentClient, nextClient, queueLength };
  }
}
