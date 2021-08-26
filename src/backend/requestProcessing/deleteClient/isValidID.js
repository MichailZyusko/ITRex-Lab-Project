import validator from 'validator';
import { ApiError } from '../../classes/index.js';

class DeleteClientDto {
  constructor({ query: { searchString: searchClient } } = {}) {
    this.searchClient = searchClient;
  }
}

const isValid = (searchClient) => validator.isAlpha(searchClient);

export default async (req, res, next) => {
  try {
    const { searchClient } = new DeleteClientDto(req);

    if (!searchClient) {
      throw new ApiError(400, 'Request searchString is empty');
    }

    if (!isValid(searchClient)) {
      throw new ApiError(400, 'SearchString does not valid');
    }

    req.body.searchClient = searchClient;
    next();
  } catch (error) {
    next(error);
  }
};
