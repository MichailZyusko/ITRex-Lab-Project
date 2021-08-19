import redis from 'redis';
import bluebird from 'bluebird';
import { MemoryStorage, RedisStorage, Queue } from '../backend/classes/index.js';
import config from '../../config.js';

bluebird.promisifyAll(redis);

const { storage: { port, host, storageType } } = config;

const createStorage = (type) => {
  console.log(`Create new ${type} storage`);

  if (type === 'Redis') {
    return new Queue(new RedisStorage(redis.createClient(port, host)));
  }
  if (type === 'inMemory') {
    return new Queue(new MemoryStorage(new Map()));
  }
};

export default createStorage(storageType);
