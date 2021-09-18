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
      return res
        .status(302)
        .send({ url: '/patient-sign-in/' });
    }

    next();
  } catch (error) {
    next(error);
  }
};
