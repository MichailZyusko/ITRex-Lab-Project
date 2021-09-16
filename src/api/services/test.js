/* eslint-disable no-undef */

import sinon from 'sinon';
import chai from 'chai';
import QueueService from './queueServices.js';

const { expect } = chai;

describe('QueueServices', () => {
  const queueID = 'ebf2a44f-4d2c-43b8-94c8-0a0dccbf296c';
  const patientID = '02129b6b-188b-44f3-bb25-fa0f47f68294';
  const invalidPatientID = 'not valid patient ID';
  const exampleOfPatient = {
    firstName: 'Michail',
    lastName: 'Zyusko',
    gender: 'Male',
    birthday: '04.12.2001',
    email: 'michail.zyusko@gmail.com',
    patientID: '02129b6b-188b-44f3-bb25-fa0f47f68294',
  };

  let queue;
  let redisStorage;

  beforeEach(() => {
    redisStorage = sinon.stub({
      setPatient: () => {},
      getCurrentPatient: () => {},
      deleteCurrentPatient: () => {},
      isExistPatient: () => {},
    });

    queue = new QueueService(redisStorage);
  });

  afterEach(() => {
    sinon.restore();
  });

  describe('[METHOD] addPatient', () => {
    it('Positive: Should add patient with "patientID" to queue with "queueID" with score "count"', async () => {
      redisStorage.setPatient
        .withArgs(patientID, queueID)
        .resolves(1);

      const result = await queue.addPatient(patientID, queueID);

      expect(result).equals(1);
      expect(redisStorage.setPatient.called).equals(true);
      expect(redisStorage.setPatient.calledOnce).equals(true);
      expect(redisStorage.setPatient.calledWith(patientID, queueID)).equals(true);
    });
    // Add more cases (negative and other);
  });

  // TODO Вот тут есть вопрос. Конкретно вот этот метод вызывает БД. Мне ее тоже мокать?
  // describe('[METHOD] getCurrentPatient', () => {
  //   it('Positive: Should return current patient from queue with "queueID" ', async () => {
  //     redisStorage.getCurrentPatient
  //       .withArgs(queueID)
  //       .resolves(exampleOfPatient);

  //     const result = await queue.getCurrentPatient();

  //     expect(result).equals(exampleOfPatient);
  //     expect(redisStorage.getCurrentPatient.called).equals(true);
  //     expect(redisStorage.getCurrentPatient.calledOnce).equals(true);
  //     expect(redisStorage.getCurrentPatient.calledWith()).equals(true);
  //   });
  // Add more cases (negative and other);
  // });

  describe('[METHOD] deleteCurrentPatient', () => {
    it('Positive: Should delete current patient from queue with "queueID"', async () => {
      redisStorage.deleteCurrentPatient
        .withArgs(queueID)
        .resolves(exampleOfPatient);

      const result = await queue.deleteCurrentPatient(queueID);

      expect(result).equals(exampleOfPatient);
      expect(redisStorage.deleteCurrentPatient.called).equals(true);
      expect(redisStorage.deleteCurrentPatient.calledOnce).equals(true);
      expect(redisStorage.deleteCurrentPatient.calledWith(queueID)).equals(true);
    });
    // Add more cases (negative and other);
  });

  describe('[METHOD] isExistPatient', () => {
    it('Positive: Should return true if patient with "patientID" exist in queue with "queueID"',
      async () => {
        redisStorage.isExistPatient
          .withArgs(queueID, patientID)
          .resolves(true);

        const result = await queue.isExistPatient(patientID, queueID);

        expect(result).equals(true);
        expect(redisStorage.isExistPatient.called).equals(true);
        expect(redisStorage.isExistPatient.calledOnce).equals(true);
        expect(redisStorage.isExistPatient.calledWith(queueID, patientID)).equals(true);
      });

    it('Negative: Should return false if patient with "patientID" does not exist in queue with "queueID"',
      async () => {
        redisStorage.isExistPatient
          .withArgs(queueID, patientID)
          .resolves(true);

        const result = await queue.isExistPatient(invalidPatientID);

        expect(result).equals(false);
        expect(redisStorage.isExistPatient.called).equals(true);
        expect(redisStorage.isExistPatient.calledOnce).equals(true);
        expect(redisStorage.isExistPatient.calledWith(queueID, patientID)).equals(false);
      });
  });
});
