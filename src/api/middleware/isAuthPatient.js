export default (req, res, next) => {
  try {
    const { patientToken } = req.cookies;

    if (!patientToken) {
      return res
        .status(302)
        .send({ url: '/patient-sign-in/' });
    }
    next();
  } catch (error) {
    next(error);
  }
};
