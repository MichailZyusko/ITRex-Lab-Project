import queue from '../../../storage/index.js';
import { ApiError } from '../../classes/index.js';

const isEqual = (obj1, obj2) => {
  const { firstName: firstName_, lastName: lastName_, age: age_ } = obj1;
  const { firstName: _firstName, lastName: _lastName, age: _age } = obj2;

  return (firstName_ === _firstName
          && lastName_ === _lastName
          && age_ === _age);
};

const isExistInIncomingQueue = async (obj) => {
  const array = await queue.getClients();
  return array.find((e) => isEqual(e, obj));
};

export default async ({ data: client }, res, next) => {
  try {
    if (await isExistInIncomingQueue(client)) {
      throw new ApiError(400, `${client.firstName} ${client.lastName} is already in line`);
    }

    next();
  } catch (error) {
    next(error);
  }
};
