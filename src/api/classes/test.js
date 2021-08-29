/* eslint-disable no-undef */

import redis from 'redis';
import bluebird from 'bluebird';
import chai from 'chai';

import {
  MemoryStorage, RedisStorage, DatabaseStorage, Queue,
} from './index.js';
import config from '../../../config.js';
import createDatabase from '../../storage/database/createDatabase.js';
import sequelize from '../../storage/database/index.js';

import {
  allQueuesTable, clientsTable,
  doctorsTable, medicalCardsTable, queuesTable,
} from '../../storage/database/tables/index.js';

const createDatabaseStorage = async () => {
  try {
    await createDatabase();
    await (async () => {
      console.log(allQueuesTable, clientsTable,
        doctorsTable, medicalCardsTable, queuesTable);
    })();

    await sequelize.sync({ force: true });
  } catch (error) {
    console.log(error);
  }
};

const { expect } = chai;

bluebird.promisifyAll(redis);

const { storage: { port, host, storageType } } = config;

const createStorage = async (type) => {
  console.log(`Create new ${type} storage`);

  if (type === 'redis') {
    return new Queue(new RedisStorage(redis.createClient(port, host)));
  }
  if (type === 'inMemory') {
    return new Queue(new MemoryStorage(new Map()));
  }
  if (type === 'database') {
    await createDatabaseStorage();
    return new Queue(new DatabaseStorage());
  }
};

setTimeout(async () => {
  const queue = await createStorage(storageType);

  describe('Queue tests', () => {
    beforeEach(async () => {
      await queue.addClient({
        firstName: 'Michail',
        lastName: 'Zyusko',
        gender: 'Male',
        fullAge: '19',
        country: 'Belarus',
        address: 'Minsk, Filatova street 9, apt 18',
        email: 'michail.zyusko@gmail.com',
        phoneNumber: '+375 (29) 935-77-10',
        clientID: 'ef1a62d5-38e1-4687-b4c2-3be008dbad6a',
      });
      await queue.addClient({
        firstName: 'Larisa',
        lastName: 'Kiyna',
        gender: 'Female',
        fullAge: '29',
        country: 'Belarus',
        address: 'Zhodino, Filatova street 9, apt 18',
        email: 'larisa.kiyna@gmail.com',
        phoneNumber: '+375 (29) 888-77-10',
        clientID: 'db0f26e1-0525-4f74-83ab-4f14f0a90f41',
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
      await queue.setDiagnose('ef1a62d5-38e1-4687-b4c2-3be008dbad6a', 'diagnose1', 60000);
      const result = await queue.deleteClient('Michail');
      expect(result).eql('OK');
    });

    it('Should find client in an queue', async () => {
      await queue.setDiagnose('ef1a62d5-38e1-4687-b4c2-3be008dbad6a', 'diagnose1', 30000);
      const result = await queue.findClient('Michail');
      expect(result).to.be.an('array');
    });

    it('Should set diagnose to client', async () => {
      const TTL = 30000;
      const ID = 'ef1a62d5-38e1-4687-b4c2-3be008dbad6a';
      const diagnose = 'sdfasdfasdfasdf';
      const result = await queue.setDiagnose(ID, diagnose, TTL);

      expect(result).eql('OK');
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
        clientID: '193e3cc6-2409-4eeb-8417-79b61c3e590d',
      };
      const result = await queue.addClient(exampleOfClient);
      expect(result).eql('OK');
    });
  });

  run();
}, 1000);
