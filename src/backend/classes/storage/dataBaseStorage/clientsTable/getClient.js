import clientsTable from '../../../../../storage/database/tables/clientsTable.js';
import getResolutionByClientID from '../medicalCardsTable/helper/getResolutionByClientID.js';

export default async (key) => {
  try {
    const { clientID } = await clientsTable.findOne({ where: { firstName: `${key}` } });

    const resolution = await getResolutionByClientID(clientID);

    return resolution;
  } catch (error) {
    console.log(error);
  }
};
