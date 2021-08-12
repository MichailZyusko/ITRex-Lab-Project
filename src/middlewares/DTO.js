/* eslint-disable consistent-return */

import { DTO, ApiError } from '../classes/index.js';

export default async (req, res, next) => {
  try {
    req.data = new DTO(req);
    if (!(Number.isNaN(+req.data.reqParam) && req.data.body)) {
      throw new ApiError(400, 'Bad request: request.body && request.params are empty');
    }

    next();
  } catch (error) {
    next(error);
  }
};
