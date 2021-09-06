import DatabaseStorage from '../../../database/DatabaseStorage.js';

export default async ({ data: patient }, res, next) => {
  try {
    await DatabaseStorage.setPatient(patient);

    res.redirect('http://localhost:3000/sign-in/');
  } catch (error) {
    console.error(error);
    next(error);
  }
};
