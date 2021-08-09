const Queue = require('./Queue.js');

// Входящая очередь
module.exports = class IncomingQueue extends Queue {
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
};
