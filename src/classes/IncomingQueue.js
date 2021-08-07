const Queue = require('./Queue.js');

// Входящая очередь
module.exports = class IncomingQueue extends Queue {
  deleteClient() {
    return this.data.shift();
  }
};
