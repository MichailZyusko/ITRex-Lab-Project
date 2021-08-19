import { ApiError } from '../../classes/index.js';

class SearchClientDto {
  constructor({ params: { id: ID } } = {}) {
    this.ID = ID;
  }
}

export default async (req, res, next) => {
  try {
    const { ID } = new SearchClientDto(req);

    if (!ID) {
      throw new ApiError(400, 'Request ID is empty');
    }

    req.ID = ID;
    next();
  } catch (error) {
    next(error);
  }
};
