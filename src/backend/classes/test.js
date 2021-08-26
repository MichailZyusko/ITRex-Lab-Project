/* eslint-disable no-undef */

import redis from 'redis';
import bluebird from 'bluebird';
import chai from 'chai';
import { MemoryStorage, RedisStorage, Queue } from './index.js';
import config from '../../../config.js';

const { expect } = chai;

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

const queue = createStorage(storageType);

describe('Queue tests', () => {
  beforeEach(() => {
    queue.addClient('0', {
      firstName: 'Michail',
      lastName: 'Zyusko',
      gender: 'Male',
      fullAge: '19',
      country: 'Belarus',
      address: 'Minsk, Filatova street 9, apt 18',
      email: 'michail.zyusko@gmail.com',
      phoneNumber: '+375 (29) 935-77-10',
      ID: 0,
    });
    queue.addClient('1', {
      firstName: 'Larisa',
      lastName: 'Kiyna',
      gender: 'Female',
      fullAge: '29',
      country: 'Belarus',
      address: 'Zhodino, Filatova street 9, apt 18',
      email: 'larisa.kiyna@gmail.com',
      phoneNumber: '+375 (29) 888-77-10',
      ID: 1,
    });
  });

  it('Return all clients', async () => {
    expect(await queue.getClients()).to.be.an('array');
  });

  it('Return nextClient, currentClient and queueLength', async () => {
    const result = await queue.callNextClient();
    expect(result).to.be.an('object');
    expect(result.currentClient).to.be.an('object');
    expect(result.nextClient).to.be.an('object');
    expect(result.queueLength).to.be.an('number');
  });

  it('Should delete client from queue', async () => {
    const result = await queue.deleteClient('0');
    expect(result).to.be.an('object');
  });

  it('Should find client in an queuu', async () => {
    const result = await queue.findClient('0');
    expect(result).to.be.an('object');
  });

  it('Should set diagnose to client', async () => {
    const TTL = 30000;
    const ID = '0';
    const diagnose = 'sdfasdfasdfasdf';
    const { result: client } = await queue.setDiagnose(ID, diagnose, TTL);
    expect(client.diagnose).eql(diagnose);
    expect(client.TTL).eql(TTL);
  });

  it('Should add client to queue', async () => {
    const exampleOfClient = {
      firstName: 'Anna',
      lastName: 'Lagodich',
      gender: 'Female',
      fullAge: '19',
      country: 'Belarus',
      address: 'Minsk, Filatova street 9, apt 18',
      email: 'anna.lagodich@gmail.com',
      phoneNumber: '+375 (29) 935-77-10',
      ID: 3,
    };
    const result = await queue.addClient('3', exampleOfClient);
    expect(result).eql('OK');
  });
});
