/* eslint-disable class-methods-use-this */

export default class {
  constructor(data) {
    this.data = data;
  }

  set(key, value) {
    return this.data.set(+key, value);
  }

  get(key) {
    return this.data.get(+key);
  }

  delete(key) {
    return this.data.delete(+key);
  }

  values() {
    return this.data.values();
  }

  has(key) {
    return this.data.has(+key);
  }

  setTTL(key, TTL) {
    setTimeout(() => this.data.delete(key), TTL);
  }
}
