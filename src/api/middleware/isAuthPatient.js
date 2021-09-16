export default (req, res, next) => {
  try {
    const { patientToken } = req.cookies;

    if (!patientToken) {
      return res.redirect('http://localhost:3000/patient-sign-in/');
    }

    next();
  } catch (error) {
    next(error);
  }
};
