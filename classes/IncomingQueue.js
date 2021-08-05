/* eslint-disable no-underscore-dangle */

const Queue = require('./Queue');

// Входящая очередь
module.exports = class IncomingQueue extends Queue {
  remove() {
    return this._data.shift();
  }
};
