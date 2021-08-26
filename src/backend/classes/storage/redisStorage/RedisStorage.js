/* eslint-disable no-return-await */
/* eslint-disable no-param-reassign */
/* eslint-disable no-restricted-syntax */

import redis from 'redis';
import bluebird from 'bluebird';
import RedisScan from 'node-redis-scan';
import config from '../../../../../config.js';

const { redis: { port, host } } = config;

bluebird.promisifyAll(redis);

const transformObject = (obj) => {
  const returnedObject = {};

  for (const [key, value] of Object.entries(obj)) {
    returnedObject[key] = value.toString();
  }

  return returnedObject;
};

export default class {
  constructor() {
    this.data = redis.createClient(port, host);
  }

  async set(client) {
    client.status = '';
    return this.data.hmsetAsync(`clients:${client.clientID}`, transformObject(client));
  }

  // TODO Вынести общий код из get и delete
  async get(searchString) {
    return new Promise((resolve) => {
      new RedisScan(this.data).scan('clients:*', async (err, matchingKeys) => {
        if (err) {
          throw (err);
        }

        const array = (await Promise.all(matchingKeys
          .map((item) => this.data.hgetallAsync(item))))
          .filter((item) => item.firstName === searchString);

        if (array.length) {
          const { clientID } = array[0];
          const resolution = await this.data.hgetallAsync(`resolutions:${clientID}`);
          if (resolution) {
            const { diagnose } = resolution;

            resolve(diagnose);
          } else {
            resolve(null);
          }
        }
      });
    });
  }

  // TODO Вынести общий код из get и delete
  async delete(searchString) {
    return new Promise((resolve) => {
      new RedisScan(this.data).scan('clients:*', async (err, matchingKeys) => {
        if (err) {
          throw (err);
        }

        const array = (await Promise.all(matchingKeys
          .map((item) => this.data.hgetallAsync(item))))
          .filter((item) => item.firstName === searchString);

        if (array.length) {
          const { clientID } = array[0];
          const resolution = await this.data.hgetallAsync(`resolutions:${clientID}`);
          if (resolution) {
            resolve(this.data.hmsetAsync(`resolutions:${clientID}`, transformObject({
              diagnose: 'null',
              TTL: 'null',
            })));
          } else {
            resolve(null);
          }
        }
      });
    });
  }

  async has(key) {
    return this.data.existsAsync(`clients:${key}`);
  }

  async setDiagnose(clientID, diagnose, TTL) {
    const client = await this.data.hgetallAsync(`clients:${clientID}`);
    client.status = 'true';

    await this.data.hmsetAsync(`clients:${clientID}`, client);
    await this.data.hmsetAsync(`resolutions:${clientID}`, transformObject({ diagnose, TTL }));

    return await this.data.expireAsync(`resolutions:${clientID}`, TTL / 1e3);
  }

  async values() {
    return new Promise((resolve) => {
      new RedisScan(this.data).scan('clients:*', async (err, matchingKeys) => {
        if (err) {
          throw (err);
        }

        const array = (await Promise.all(matchingKeys
          .map((item) => this.data.hgetallAsync(item))))
          .sort((a, b) => Date.parse(a.recordTime) - Date.parse(b.recordTime))
          .filter((item) => !item.status);

        resolve(array);
      });
    });
  }
}
