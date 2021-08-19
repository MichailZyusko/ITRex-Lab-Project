import { ApiError } from '../../classes/index.js';

class AddClientDto {
  constructor({ body } = {}) {
    this.client = body;
  }
}

export default async (req, res, next) => {
  try {
    const { client } = new AddClientDto(req);

    if (!client) {
      throw new ApiError(400, 'Request body is empty');
    }

    req.client = client;
    next();
  } catch (error) {
    next(error);
  }
};
