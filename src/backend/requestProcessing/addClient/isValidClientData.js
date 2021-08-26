import validator from 'validator';
import { ApiError } from '../../classes/index.js';

class AddClientDto {
  constructor({ body } = {}) {
    this.client = body;
  }
}

const isValid = (obj) => (validator.isEmail(obj.email)
  && validator.isAlpha(obj.firstName)
  && validator.isAlpha(obj.lastName)
  && validator.isIn(obj.gender, ['Male', 'Female', 'male', 'female'])
  && validator.isInt(obj.fullAge.toString()));

export default async (req, res, next) => {
  try {
    const { client } = new AddClientDto(req);

    if (!client) {
      throw new ApiError(400, 'Request body is empty');
    }

    if (!isValid(client)) {
      throw new ApiError(400, 'Not valid form data');
    }

    req.body.client = client;
    next();
  } catch (error) {
    next(error);
  }
};
