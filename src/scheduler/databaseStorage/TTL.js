import medicalCardsTable from '../../storage/database/tables/medicalCardsTable.js';

export default async () => {
  try {
    const allData = await medicalCardsTable.findAll();
    const now = Date.parse(new Date());

    allData
      .filter((item) => item.TTL !== 'NULL' && item.status !== 'outdate' && now - Date.parse(item.TTL) >= 0)
      .forEach(async (item) => {
        await medicalCardsTable.update({ status: 'outdate' }, {
          where: {
            clientID: `${item.clientID}`,
          },
        });
      });
  } catch (error) {
    console.log(error);
  }
};
