import queue from '../../../storage/index.js';
import ApiError from '../../classes/ApiError.js';

export default async ({ data: searchClient }, res, next) => {
  try {
    const response = await queue.findClient(searchClient);

    if (response instanceof ApiError) {
      throw response;
    }

    res.send(response);
  } catch (error) {
    console.error(error);
    next(error);
  }
};
