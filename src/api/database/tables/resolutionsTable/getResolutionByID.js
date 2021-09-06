import resolutionsTable from '../../../../storage/database/tables/resolutionsTable.js';

export default async (resolutionID) => {
  try {
    const resolution = await resolutionsTable.findOne({
      where: { resolutionID: `${resolutionID}` },
    });

    return resolution;
  } catch (error) {
    console.log(error);
    return null;
  }
};
