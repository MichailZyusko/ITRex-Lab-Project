import resolutionsTable from '../../../../storage/database/tables/resolutionsTable.js';

export default async (resolutionID, medicalCardID,
  doctorID, diagnose, comingDate, TTL) => {
  try {
    await resolutionsTable.create({
      resolutionID,
      medicalCardID,
      doctorID,
      resolutionText: diagnose,
      date: comingDate,
      TTL,
    });
  } catch (error) {
    console.log(error);
  }
};
