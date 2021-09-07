/* eslint-disable no-undef */

import sinon from 'sinon';
import chai from 'chai';
import QueueService from './services/queueServices.js';
import QueueStorage from './storage/queueStorage.js';

const { expect } = chai;

describe('QueueService', () => {
  let service;
  let storage;
  let redisClient;

  beforeEach(() => {
    const queueID = 'ebf2a44f-4d2c-43b8-94c8-0a0dccbf296c';

    // redisClient = sinon.stub({
    //   setPatient: () => {},
    //   getCurrentPatient: () => {},
    //   deleteCurrentPatient: () => {},
    //   getQueueLengt: () => {},
    //   isExistPatient: () => {},
    //   getPopsitionInQueue: () => {},
    // });

    redisClient = sinon.stub({
      zaddAsync: () => {},
      zrangeAsync: () => {},
      zpopminAsync: () => {},
      zcardAsync: () => {},
      zscoreAsync: () => {},
      zrangebyscoreAsync: () => {},
    });

    storage = new QueueStorage(redisClient);
    service = new QueueService(queueID, storage);
  });

  afterEach(() => {
    sinon.restore();
  });

  describe('[METHOD] addPatient', () => {
    it('Should add patient to queue by patientID', async () => {
      const patientID = '02129b6b-188b-44f3-bb25-fa0f47f68294';
      const queueID = 'ebf2a44f-4d2c-43b8-94c8-0a0dccbf296c';
      const count = 1;

      redisClient.setPatient
        .withArgs(patientID, queueID, count)
        .resolves(1);

      const result = await service.addPatient(patientID);

      expect(result).equals(1);
      expect(redisClient.setPatient.called).equals(true);
      expect(redisClient.setPatient.calledOnce).equals(true);
      expect(redisClient.setPatient.calledWith(patientID, queueID, count)).equals(true);
    });

    // it('should throw an error that redisClient threw', () => {
    //   const key = 'key';
    //   const error = new Error();

    //   redisClient.getAsync
    //     .withArgs(key)
    //     .rejects(error);

    //   expect(service.get(key)).rejects.toThrow(error);
    //   expect(redisClient.getAsync.called).equals(true);
    //   expect(redisClient.getAsync.calledOnce).equals(true);
    //   expect(redisClient.getAsync.calledWith(key)).equals(true);
    // });
  });

  // describe('[METHOD] set', () => {
  //   it('should set value without ttl', async () => {
  //     const key = 'key';
  //     const value = 'value';

  //     redisClient.setAsync
  //       .withArgs(key, value)
  //       .resolves(undefined);

  //     const result = await service.set(key, value);

  //     expect(redisClient.setAsync.called).equals(true);
  //     expect(redisClient.setAsync.calledOnce).equals(true);
  //     expect(redisClient.setAsync.calledWith(key, value)).equals(true);
  //   });

  //   // it('should set value with a tll', () => {
  //   //   const key = 'key';
  //   //   const value = 'value';
  //   //   const ttl = 1000;

  //   //   redisClient.setAsync
  //   //     .withArgs(key, value);
  //   //     .resolves(undefined);
  //   //   redisClient.expireAsync
  //   //     .withArgs(key, ttl);
  //   //     .resolves(undefined);

  //   //   await service.set(key, value, ttl);

  //   //   expect(redisClient.setAsync.called).equals(true);
  //   //   expect(redisClient.setAsync.calledOnce).equals(true);
  //   //   expect(redisClient.setAsync.calledWith(key, value)).equals(true);
  //   //   expect(redisClient.expireAsync.called).equals(true);
  //   //   expect(redisClient.expireAsync.calledOnce).equals(true);
  //   //   expect(redisClient.expireAsync.calledWith(key, ttl)).equals(true);
  //   // });

  //   it('should throw an error that redisClient threw', () => {
  //     const key = 'key';
  //     const value = 'value';
  //     const error = new Error();

  //     redisClient.setAsync
  //       .withArgs(key, value)
  //       .rejects(error);

  //     expect(service.set(key, value)).rejects.toThrow(error);
  //     expect(redisClient.setAsync.called).equals(true);
  //     expect(redisClient.setAsync.calledOnce).equals(true);
  //     expect(redisClient.setAsync.calledWith(key, value)).equals(true);
  //   });
  // });
});
