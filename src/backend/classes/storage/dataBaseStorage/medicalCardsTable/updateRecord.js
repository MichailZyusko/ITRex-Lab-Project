import medicalCardsTable from '../../../../../storage/database/tables/medicalCardsTable.js';
import setStatusToClientInQueue from '../queuesTable/helper/setStatusToClientInQueue.js';

export default async (clientID, diagnose, TTL) => {
  try {
    await setStatusToClientInQueue(clientID);
    await medicalCardsTable.update(
      {
        diagnose,
        TTL,
      },
      {
        where: {
          clientID: `${clientID}`,
        },
      },
    );
  } catch (error) {
    console.log(error);
  }
};
