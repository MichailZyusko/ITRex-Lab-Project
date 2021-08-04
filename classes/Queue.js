/* eslint-disable no-underscore-dangle */

// Класс очереди с нужными нам методами
module.exports = class Queue {
  constructor() {
    this._data = [];
  }

  add(v) {
    this._data.push(v);
  }

  remove() {
    return this._data.shift();
  }

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
