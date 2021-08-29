import medicalCardsTable from '../../../../../storage/database/tables/medicalCardsTable.js';
import getClientIDbyFirstName from '../clientsTable/helper/getClientIDbyFirstName.js';

export default async (key) => {
  const { clientID } = await getClientIDbyFirstName(key);
  try {
    const result = await medicalCardsTable.update({ status: 'outdate' }, {
      where: {
        clientID: `${clientID}`,
      },
    });

    return result;
  } catch (error) {
    console.log(error);
  }
};
