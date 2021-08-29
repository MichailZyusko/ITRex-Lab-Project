import { deleteClient } from '../methods/index.js';

export default async (searchString) => {
  if (await deleteClient(searchString)) {
    return 'This client was successfully delete';
  }

  return 'Failed to delete the client :(';
};
