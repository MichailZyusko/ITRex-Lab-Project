/* eslint-disable no-return-await */
/* eslint-disable no-param-reassign */

import redis from 'redis';
import bluebird from 'bluebird';
import RedisScan from 'node-redis-scan';
import config from '../../../../../config.js';

const { redis: { port, host } } = config;

bluebird.promisifyAll(redis);

export default class {
  constructor() {
    this.data = redis.createClient(port, host);
  }

  async set(client) {
    client.status = '';
    return this.data.hmsetAsync(`clients:${client.clientID}`, client);
  }

  // TODO Вынести общий код из get и delete
  get(searchString) {
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
            const { diagnose, status, TTL } = resolution;

            resolve({ diagnose, status, TTL });
          } else {
            resolve(null);
          }
        }

        resolve(null);
      });
    });
  }

  // TODO Вынести общий код из get и delete
  delete(searchString) {
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
            resolution.status = 'outdate';
            resolve(this.data.hmsetAsync(`resolutions:${clientID}`, resolution));
          } else {
            resolve(null);
          }
        }
      });
    });
  }

  async has(key) {
    return await this.data.existsAsync(`clients:${key}`);
  }

  async setDiagnose(clientID, diagnose, TTL) {
    const client = await this.data.hgetallAsync(`clients:${clientID}`);
    client.status = 'true';

    await this.data.hmsetAsync(`clients:${clientID}`, client);
    await this.data.hmsetAsync(`resolutions:${clientID}`, {
      diagnose,
      TTL,
      status: 'relevant',
    });
  }

  values() {
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

  getResolutions() {
    return new Promise((resolve) => {
      new RedisScan(this.data).scan('resolutions:*', async (err, matchingKeys) => {
        if (err) {
          throw (err);
        }

        const array = (await Promise.all(matchingKeys
          .map(async (item) => ({
            key: item,
            value: await this.data.hgetallAsync(item),
          }))));

        // const array = matchingKeys
        //   .map((item) => ({
        //     key: item,
        //     value: await this.data.hgetallAsync(item),
        //   }));

        resolve(array);
      });
    });
  }
}
