import resolutionsTable from '../storage/database/tables/resolutionsTable.js';

export default async () => {
  try {
    const allData = await resolutionsTable.findAll();
    const now = Date.parse(new Date());

    allData
      .filter((item) => item.status !== 'outdate' && now - Date.parse(item.TTL) >= 0)
      .forEach(async (item) => {
        await resolutionsTable.update({ status: 'outdate' }, {
          where: {
            resolutionID: `${item.resolutionID}`,
          },
        });
      });
  } catch (error) {
    console.log(error);
  }
};
