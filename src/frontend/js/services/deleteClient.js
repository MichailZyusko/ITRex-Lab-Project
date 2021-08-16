import { deleteClient } from '../methods/index.js';

// Удаляет пациента по его имени
export default async (searchString) => {
  const deletingResult = await deleteClient(searchString);

  return deletingResult === 'Nothing was found for your query'
    ? 'Something went wrong'
    : 'This client was successfully delete';
};
