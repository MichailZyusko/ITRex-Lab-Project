import clientsTable from '../../../../../storage/database/tables/clientsTable.js';
import getResolutionByClientID from '../medicalCardsTable/helper/getResolutionByClientID.js';

export default async (key) => {
  try {
    const { clientID } = await clientsTable.findOne({ where: { firstName: `${key}` } });

    return await getResolutionByClientID(clientID);
  } catch (error) {
    console.log(error);
    return null;
  }
};
