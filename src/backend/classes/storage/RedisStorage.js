export default class {
  constructor(data = null) {
    this.data = data;
  }

  async get(key) {
    return this.data.getAsync(key);
  }

  async delete(key) {
    return this.data.delAsync(key);
  }

  async set(ID, value) {
    if (value.TTL) {
      this.data.expireAsync(ID, value.TTL);
    }

    return this.data.setAsync(ID, value);
  }

  async values() {
    const values = [];
    return new Promise((resolve, reject) => {
      this.data.keys('*', async (err, keys) => {
        keys.reverse().forEach((item) => values.push(this.data.getAsync(+item)));
        resolve(await Promise.all(values));
      });
    });
  }
  // Мб добавить проверку на существование элемента и использовать это
}
