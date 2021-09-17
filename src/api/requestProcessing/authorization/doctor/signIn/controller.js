import DatabaseStorage from '../../../../database/index.js';

export default async ({ data: { password, login } }, res, next) => {
  try {
    const result = await DatabaseStorage.findDoctorByLogin(password, login);

    if (result) {
      res
        .cookie('doctorToken', `${result.token}`, {
          path: '/',
          httpOnly: true,
          secure: true,
          sameSite: 'strict',
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
