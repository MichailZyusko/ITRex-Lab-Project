import resolutionsTable from '../../../../storage/database/tables/resolutionsTable.js';
import resolutionStatus from '../resolutionStatus.js';

export default async (resolutionID) => {
  try {
    await resolutionsTable.update(
      { status: resolutionStatus.outdate },
      {
        where: { resolutionID: `${resolutionID}` },
      },
    );
  } catch (error) {
    console.log(error);
  }
};
