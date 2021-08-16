/* eslint-disable import/no-cycle */

import queue from '../../../database/index.js';

// Засунуть в конфиг файл
export default class {
  constructor(data) {
    this.data = data;
  }

  set(key, value) {
    if (value.TTL) {
      setTimeout(async () => queue.deleteClient(key), value.TTL);
    }

    return this.data.set(key, value);
  }

  get(key) {
    return this.data.get(key);
  }

  delete(key) {
    return this.data.delete(key);
  }

  values() {
    return this.data.values();
  }
  // Мб добавить проверку на существование элемента и использовать это
}
