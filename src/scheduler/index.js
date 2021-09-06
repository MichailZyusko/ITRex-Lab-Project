import databaseTTL from './TTL.js';

const TTL = databaseTTL;
const refreshTime = 1e3;

export default () => setInterval(() => TTL(), refreshTime);
