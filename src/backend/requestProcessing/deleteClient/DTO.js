import { ApiError } from '../../classes/index.js';

class DeleteClientDto {
  constructor({ params: { id: ID } } = {}) {
    this.ID = ID;
  }
}

export default async (req, res, next) => {
  try {
    const { ID } = new DeleteClientDto(req);

    if (!ID) {
      throw new ApiError(400, 'Request ID is empty');
    }

    req.ID = ID;
    next();
  } catch (error) {
    next(error);
  }
};
