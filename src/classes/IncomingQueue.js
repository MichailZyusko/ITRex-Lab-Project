import Queue from './Queue.js';
// Входящая очередь
export default class IncomingQueue extends Queue {
  constructor() {
    super();
    this.currentClient = { value: null };
  }

  deleteClient() {
    return this.data.shift();
  }

  setCurrentClient(currentClient) {
    this.currentClient = currentClient;
    return currentClient;
  }
}
