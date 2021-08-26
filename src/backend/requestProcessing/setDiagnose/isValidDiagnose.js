import validator from 'validator';
import { ApiError } from '../../classes/index.js';
import config from '../../../../config.js';

// params: { id: ID } = {},
class SetDiagnoseDTO {
  constructor({ body: { value, TTL }, query: { id: ID } }, defaultTTL) {
    this.diagnose = value;
    this.TTL = TTL || defaultTTL;
    this.ID = ID;
  }
}

const isValid = (diagnose, ID, TTL) => validator.isAlpha(diagnose)
  && validator.isUUID(ID)
  && validator.isInt(TTL.toString());

export default async (req, res, next) => {
  try {
    const { client: { TTL: defaultTTL } } = config;
    const { diagnose, TTL, ID } = new SetDiagnoseDTO(req, defaultTTL);

    if (!(diagnose && ID && TTL)) {
      throw new ApiError(400, 'Invalid request body');
    }

    if (!isValid(diagnose, ID, TTL)) {
      throw new ApiError(400, 'Not valid diagnose');
    }

    req.body = {
      TTL,
      diagnose,
      ID,
    };
    next();
  } catch (error) {
    next(error);
  }
};
