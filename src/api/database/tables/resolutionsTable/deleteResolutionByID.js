import resolutionsTable from '../../../../storage/database/tables/resolutionsTable.js';

export default async (resolutionID) => {
  try {
    await resolutionsTable.update(
      { status: 'outdate' },
      {
        where: { resolutionID: `${resolutionID}` },
      },
    );
  } catch (error) {
    console.log(error);
  }
};
