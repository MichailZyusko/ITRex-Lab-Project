import { searchClientInOutgoingQueue } from '../methods/POST.js';

export default async (searchString) => {
  const searchResult = await searchClientInOutgoingQueue({ search: searchString });

  return JSON.stringify(searchResult, null, 4);
};
