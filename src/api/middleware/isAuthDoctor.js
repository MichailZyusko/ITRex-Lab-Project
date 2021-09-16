export default (req, res, next) => {
  try {
    const { doctorToken } = req.cookies;

    if (!doctorToken) {
      return res.redirect('http://localhost:3000/doctor-sign-in/');
    }

    next();
  } catch (error) {
    next(error);
  }
};
