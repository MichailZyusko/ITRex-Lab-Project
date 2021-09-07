/* eslint-disable no-undef */

import sinon from 'sinon';
import chai from 'chai';
import QueueStorage from './queueStorage.js';

const { expect } = chai;

describe('QueueStorage', () => {
  const queueID = 'ebf2a44f-4d2c-43b8-94c8-0a0dccbf296c';
  const patientID = '02129b6b-188b-44f3-bb25-fa0f47f68294';
  const invalidPatientID = 'not valid patient ID';
  const count = 1;
  const exampleOfPatient = {
    firstName: 'Michail',
    lastName: 'Zyusko',
    gender: 'Male',
    birthday: '04.12.2001',
    email: 'michail.zyusko@gmail.com',
    patientID: '02129b6b-188b-44f3-bb25-fa0f47f68294',
  };

  let storage;
  let redisClient;

  beforeEach(() => {
    redisClient = sinon.stub({
      zaddAsync: () => {},
      zrangeAsync: () => {},
      zpopminAsync: () => {},
      zcardAsync: () => {},
      zscoreAsync: () => {},
      zrangebyscoreAsync: () => {},
    });

    storage = new QueueStorage(redisClient);
  });

  afterEach(() => {
    sinon.restore();
  });

  describe('[METHOD] setPatient', () => {
    it('Positive: Should add "patientID" to queue with "queueID" with score "count"', async () => {
      redisClient.zaddAsync
        .withArgs(`queues:${queueID}`, 'NX', count, patientID)
        .resolves(1);

      const result = await storage.setPatient(patientID, queueID, count);

      expect(result).equals(1);
      expect(redisClient.zaddAsync.called).equals(true);
      expect(redisClient.zaddAsync.calledOnce).equals(true);
      expect(redisClient.zaddAsync.calledWith(`queues:${queueID}`, 'NX', count, patientID)).equals(true);
    });

    // Add more cases (negative and other);
  });

  describe('[METHOD] getCurrentPatient', () => {
    it('Positive: Should return current patient from queue with "queueID" ', async () => {
      redisClient.zrangeAsync
        .withArgs(`queues:${queueID}`, 0, 0)
        .resolves(exampleOfPatient);

      const result = await storage.getCurrentPatient(queueID);

      expect(result).equals(exampleOfPatient);
      expect(redisClient.zrangeAsync.called).equals(true);
      expect(redisClient.zrangeAsync.calledOnce).equals(true);
      expect(redisClient.zrangeAsync.calledWith(`queues:${queueID}`, 0, 0)).equals(true);
    });

    // Add more cases (negative and other);
  });

  describe('[METHOD] deleteCurrentPatient', () => {
    it('Positive: Should delete current patient from queue with "queueID"', async () => {
      redisClient.zpopminAsync
        .withArgs(`queues:${queueID}`)
        .resolves(exampleOfPatient);

      const result = await storage.deleteCurrentPatient(queueID);

      expect(result).equals(exampleOfPatient);
      expect(redisClient.zpopminAsync.called).equals(true);
      expect(redisClient.zpopminAsync.calledOnce).equals(true);
      expect(redisClient.zpopminAsync.calledWith(`queues:${queueID}`)).equals(true);
    });

    // Add more cases (negative and other);
  });

  describe('[METHOD] getQueueLength', () => {
    it('Positive: Should return queue length with "queueID" ', async () => {
      redisClient.zcardAsync
        .withArgs(`queues:${queueID}`)
        .resolves(5);

      const result = await storage.getQueueLengt(queueID);

      expect(result).equals(5);
      expect(redisClient.zcardAsync.called).equals(true);
      expect(redisClient.zcardAsync.calledOnce).equals(true);
      expect(redisClient.zcardAsync.calledWith(`queues:${queueID}`)).equals(true);
    });

    // Add more cases (negative and other);
  });

  describe('[METHOD] isExistPatient', () => {
    it('Positive: Should return true if patient with "patientID" exist in queue with "queueID"',
      async () => {
        redisClient.zscoreAsync
          .withArgs(`queues:${queueID}`, patientID)
          .resolves(true);

        const result = await storage.isExistPatient(queueID, patientID);

        expect(result).equals(true);
        expect(redisClient.zscoreAsync.called).equals(true);
        expect(redisClient.zscoreAsync.calledOnce).equals(true);
        expect(redisClient.zscoreAsync.calledWith(`queues:${queueID}`, patientID)).equals(true);
      });

    it('Negatife: Should return false if patient with "patientID" does not exist in queue with "queueID"',
      async () => {
        redisClient.zscoreAsync
          .withArgs(`queues:${queueID}`, patientID)
          .resolves(true);

        const result = await storage.isExistPatient(queueID, invalidPatientID);

        expect(result).equals(undefined);
        expect(redisClient.zscoreAsync.called).equals(true);
        expect(redisClient.zscoreAsync.calledOnce).equals(true);
        expect(redisClient.zscoreAsync.calledWith(`queues:${queueID}`, patientID)).equals(false);
      });
  });
});
