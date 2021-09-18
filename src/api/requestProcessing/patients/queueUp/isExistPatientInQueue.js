import queue from '../../../../storage/index.js';
import ApiError from '../../../../errors/ApiError.js';

const isExistInQueue = async (patientID, queueID) => await queue.isExistPatient(patientID, queueID);

export default async ({ data: { patientID, doctorID: queueID } }, res, next) => {
  try {
    if (await isExistInQueue(patientID, queueID)) {
      throw new ApiError(400, 'I\'m sorry, but at this moment you are already in the queue');
    }

    next();
  } catch (error) {
    next(error);
  }
};
