import DatabaseStorage from '../../../database/DatabaseStorage.js';

export default async ({ data: { password, login } }, res, next) => {
  try {
    const result = await DatabaseStorage.findDoctorByLogin(password, login);

    // TODO Занести время жизни в конфиг
    if (result) {
      res
        .cookie('doctorToken', `${result.token}`, {
          path: '/',
          maxAge: 5 * 60 * 1e3,
        })
        .redirect('http://localhost:3000/doctor');
    } else {
      res.status(401).send();
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
};
