/* eslint-disable no-restricted-syntax */
/* eslint-disable no-param-reassign */

import RedisScan from 'node-redis-scan';

// const scanAll = async (pattern) => {
//   const found = [];
//   let cursor = '0';

//   do {
//     const reply = await this.data.scan(cursor, 'MATCH', pattern);

//     [cursor] = reply;
//     found.push(...reply[1]);
//   } while (cursor !== '0');

//   return found;
// };

const transformObject = (obj) => {
  const returnedObject = {};

  for (const [key, value] of Object.entries(obj)) {
    returnedObject[key] = value.toString();
  }

  return returnedObject;
};
export default class {
  constructor(data = null) {
    this.data = data;
  }

  async set(key, value) {
    return this.data.hmsetAsync(key.toString(), transformObject(value));
  }

  async get(key) {
    return this.data.hgetallAsync(key.toString());
  }

  async delete(key) {
    return this.data.delAsync(key);
  }

  async has(key) {
    return this.data.existsAsync(key);
  }

  async setTTL(key, TTL) {
    this.data.expireAsync(key.toString(), TTL / 1e3);
  }

  async values() {
    return new Promise((resolve) => {
      new RedisScan(this.data).scan('*', async (err, matchingKeys) => {
        if (err) {
          throw (err);
        }

        resolve(await Promise.all(matchingKeys.map((item) => this.data.hgetallAsync(item))));

        // const results = [];
        // matchingKeys.forEach((item) => results.push(this.data.hgetallAsync(item)));
        // resolve(await Promise.all(results));
      });
    });
  }
}
