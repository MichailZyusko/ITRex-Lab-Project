import queuesTable from '../../../../../../storage/database/tables/queuesTable.js';

export default async (key) => {
  try {
    const result = await queuesTable.update(
      {
        status: true,
      },
      {
        where: {
          clientID: `${key}`,
        },
      },
    );

    return result;
  } catch (error) {
    console.log(error);
  }
};
