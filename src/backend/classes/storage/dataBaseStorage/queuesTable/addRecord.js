import queuesTable from '../../../../../storage/database/tables/queuesTable.js';

export default async (queueID, clientID, recordTime) => {
  try {
    await queuesTable.create({
      queueID,
      clientID,
      recordTime,
    });
  } catch (error) {
    console.log(error);
  }
};
