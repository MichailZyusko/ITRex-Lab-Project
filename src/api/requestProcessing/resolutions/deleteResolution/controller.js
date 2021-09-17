import DatabaseStorage from '../../../database/index.js';

export default async ({ data: resolutionID }, res, next) => {
  try {
    await DatabaseStorage.deleteResolutionByID(resolutionID);

    res.status(204).send();
  } catch (error) {
    console.error(error);
    next(error);
  }
};
