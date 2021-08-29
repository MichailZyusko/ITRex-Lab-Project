import { MemoryStorage, RedisStorage, DatabaseStorage } from '../api/classes/storage/index.js';
import { Queue } from '../api/classes/index.js';
import config from '../../config.js';
import scheduler from '../scheduler/index.js';

const { storage: { storageType } } = config;

const createQueue = (type) => {
  console.log(`Create new ${type} storage`);

  if (type === 'database') {
    return new Queue(new DatabaseStorage());
  }
  if (type === 'inMemory') {
    return new Queue(new MemoryStorage());
  }
  if (type === 'redis') {
    return new Queue(new RedisStorage());
  }
};

const queue = createQueue(storageType);
scheduler(queue);

export default queue;
