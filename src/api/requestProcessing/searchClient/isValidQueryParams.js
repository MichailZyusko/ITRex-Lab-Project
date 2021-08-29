import validator from 'validator';
import { ApiError } from '../../classes/index.js';

class SearchClientDto {
  constructor({ query: { searchString: searchClient } } = {}) {
    this.searchClient = searchClient;
  }
}

const isValid = (searchString) => validator.isAlpha(searchString);

export default async (req, res, next) => {
  try {
    const { searchClient } = new SearchClientDto(req);

    if (!searchClient) {
      throw new ApiError(400, 'Request searchString is empty');
    }

    if (!isValid(searchClient)) {
      throw new ApiError(400, 'searchString does not valid');
    }

    req.data = searchClient;
    next();
  } catch (error) {
    next(error);
  }
};
