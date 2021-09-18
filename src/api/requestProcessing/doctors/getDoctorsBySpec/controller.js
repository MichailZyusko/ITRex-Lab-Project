import database from '../../../database/index.js';

export default async ({ data: specializationID }, res, next) => {
  try {
    const doctors = await database.getDoctorsBySpecID(specializationID);

    res.send(doctors);
  } catch (error) {
    console.error(error);
    next(error);
  }
};
