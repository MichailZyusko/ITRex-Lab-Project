/* eslint-disable no-underscore-dangle */

// Класс очереди с нужными нам методами
module.exports = class Queue {
  constructor() {
    this._data = [];
  }

  add(v) {
    this._data.push(v);
  }
};
