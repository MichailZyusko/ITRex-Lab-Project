import jwt from 'jsonwebtoken';
import config from '../../../config.js';
import ApiError from '../../errors/ApiError.js';

class GetTokenDTO {
  constructor({ cookies: { token } } = {}) {
    this.token = token;
  }
}

const { secretKey } = config;

export default (req, res, next) => {
  try {
    const { token } = new GetTokenDTO(req);

    if (!token) {
      return res.redirect('http://localhost:3000/sign-in/');
    }
    try {
      const { id: patientID } = jwt.verify(token, secretKey);
      req.patientID = patientID;
    } catch (err) {
      throw new ApiError(401, 'Invalid Token');
    }

    next();
  } catch (error) {
    next(error);
  }
};
