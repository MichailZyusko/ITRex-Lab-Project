import memoryTTL from './memoryStorage/TTL.js';
import redisTTL from './redisStorage/TTL.js';
import databaseTTL from './databaseStorage/TTL.js';
import config from '../../config.js';

const { storage: { storageType } } = config;

const setTTL = () => {
  if (storageType === 'inMemory') {
    return memoryTTL;
  }
  if (storageType === 'database') {
    return databaseTTL;
  }
  if (storageType === 'redis') {
    return redisTTL;
  }
};

const TTL = setTTL();
const refreshTime = 1000;

const interval = setInterval(() => TTL(refreshTime, interval), refreshTime);
