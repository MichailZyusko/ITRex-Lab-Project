import { deleteClientFromOutgoingQueue } from '../methods/DELETE.js';

// Удаляет пациента по его имени
export default async (searchString) => {
  const deletingResult = await deleteClientFromOutgoingQueue({ search: searchString });

  if (deletingResult === 'Nothing was found for your query') {
    return 'Something went wrong';
  }

  return 'This client was successfuly delete';
};
