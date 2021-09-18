import queue from '../../../../storage/index.js';

export default async ({ data: { patientID, doctorID: queueID } }, res, next) => {
  try {
    await queue.addPatient(patientID, queueID);
    const positionInQueue = await queue.storage.getQueueLength(queueID);

    res.status(201).send({ positionInQueue });
  } catch (error) {
    console.error(error);
    next(error);
  }
};
