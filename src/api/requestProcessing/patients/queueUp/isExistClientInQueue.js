/* eslint-disable no-return-await */

import queue from '../../../../storage/index.js';
import ApiError from '../../../../errors/ApiError.js';

const isExistInIncomingQueue = async (patientID, queueID) => !await queue.addPatient(patientID, queueID);

export default async ({ data: patientID, queue: queueID }, res, next) => {
  try {
    if (await isExistInIncomingQueue(patientID, queueID)) {
      throw new ApiError(400, 'I\'m sorry, but at this moment you are already in the queue');
    }

    next();
  } catch (error) {
    next(error);
  }
};
