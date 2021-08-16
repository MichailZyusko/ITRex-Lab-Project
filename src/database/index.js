/* eslint-disable */

import redis from 'redis';
import bluebird from 'bluebird';
import Queue from '../backend/classes/Queue.js';
import { MemoryStorage, RedisStorage } from '../backend/classes/storage/index.js';

bluebird.promisifyAll(redis);

const PORT = '6379';
const HOST = '127.0.0.1';
const storageType = 'Redis';

const createStorage = (storageType) =>{
  console.log(`Create new ${storageType} storage`)
  if (storageType === 'Redis'){
    return new Queue(new RedisStorage(redis.createClient(PORT, HOST)));
  }
  else  if (storageType === 'inMemory'){
    return new Queue(new MemoryStorage(new Map()));
  }
}

export default createStorage(storageType);
