import {
  MemoryStorage, RedisStorage, DatabaseStorage, Queue,
} from '../backend/classes/index.js';
import config from '../../config.js';

const { storage: { storageType } } = config;

const createQueue = (type) => {
  console.log(`Create new ${type} storage`);

  if (type === 'database') {
    return new Queue(new DatabaseStorage());
  }
  if (type === 'inMemory') {
    return new Queue(new MemoryStorage());
  }
  if (type === 'Redis') {
    return new Queue(new RedisStorage());
  }
};

export default createQueue(storageType);
