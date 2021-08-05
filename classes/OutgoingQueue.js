/* eslint-disable no-underscore-dangle */

const Queue = require('./Queue');

// Исходящая очередь
module.exports = class OutgoingQueue extends Queue {
  findElement({ search }) {
    const client = this._data.find((item) => item.firstName === search);

    if (!client) {
      return { result: 'Nothing was found for your query' };
    }

    return JSON.stringify(client, null, 4);
  }

  deleteElement({ search }) {
    const deleteIndex = this._data.findIndex((item) => item.firstName === search);

    if (deleteIndex === -1) {
      return { result: 'Nothing was found for your query' };
    }

    this._data.splice(deleteIndex, 1);

    return { result: 'The operation was successful' };
  }
};
