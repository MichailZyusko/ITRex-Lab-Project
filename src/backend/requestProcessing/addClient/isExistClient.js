import queue from '../../../storage/index.js';
import { ApiError } from '../../classes/index.js';

const replacer = (key, value) => (key === 'ID' ? undefined : value);

async function isExist(obj) {
  const array = await queue.getClients();
  return array.find((e) => JSON.stringify(e, replacer) === JSON.stringify(obj, replacer));
}

export default async ({ client }, res, next) => {
  try {
    if (await isExist(client)) {
      throw new ApiError(400, `${client.firstName} ${client.lastName} exist`);
    }

    next();
  } catch (error) {
    next(error);
  }
};
