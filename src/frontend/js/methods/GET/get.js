const makeGERequest = (route) => async () => {
  try {
    const response = await fetch(route);
    const result = await response.json();

    return result;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const makeGERequestWithQueryParams = (route) => async (searchString) => {
  try {
    const response = await fetch(`${route}?searchString=${searchString}`);
    const result = await response.json();

    return response.ok ? { result, ok: true } : { result, ok: false };
  } catch (error) {
    console.error(error);
    return null;
  }
};

const getSearchingClient = makeGERequestWithQueryParams('/api/clients/');
const getNextClient = makeGERequest('/api/clients/nextClient');

export { getSearchingClient, getNextClient };
