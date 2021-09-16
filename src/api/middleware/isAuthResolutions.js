class GetTokenDTO {
  constructor({ cookies: { patientToken, doctorToken } } = {}) {
    this.patientToken = patientToken;
    this.doctorToken = doctorToken;
  }
}

export default (req, res, next) => {
  try {
    const { patientToken, doctorToken } = new GetTokenDTO(req);

    if (!(patientToken || doctorToken)) {
      return res.redirect('http://localhost:3000/patient-sign-in/');
    }

    next();
  } catch (error) {
    next(error);
  }
};
