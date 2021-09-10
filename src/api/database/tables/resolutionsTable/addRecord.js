import resolutionsTable from '../../../../storage/database/tables/resolutionsTable.js';

export default async (resolutionID, medicalCardID,
  doctorID, diagnose, comingDate, TTL, name) => {
  try {
    await resolutionsTable.create({
      resolutionID,
      medicalCardID,
      doctorSpecialization: doctorID,
      doctorName: name,
      resolutionText: diagnose,
      date: comingDate,
      TTL,
    });
  } catch (error) {
    console.log(error);
  }
};
