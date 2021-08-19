import { ApiError } from '../../classes/index.js';
import config from '../../../../config.js';

class SetDiagnoseDTO {
  constructor({ body: { value, TTL }, params: { id: ID } = {} }, defaultTTL) {
    this.diagnose = value;
    this.TTL = TTL || defaultTTL;
    this.ID = ID;
  }
}

export default async (req, res, next) => {
  try {
    const { client: { TTL: defaultTTL } } = config;
    const { diagnose, TTL, ID } = new SetDiagnoseDTO(req, defaultTTL);

    if (!(diagnose && ID && TTL)) {
      throw new ApiError(400, 'Request body is empty');
    }

    req.TTL = TTL;
    req.diagnose = diagnose;
    req.ID = ID;
    next();
  } catch (error) {
    next(error);
  }
};
