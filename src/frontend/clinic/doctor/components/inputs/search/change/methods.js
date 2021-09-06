const makeGERequestWithQueryParams = (route) => async (lastName, firstName, email) => {
  try {
    // TODO спросить насчет собаки в параметрах
    const response = await fetch(`${route}?lastName=${lastName}&firstName=${firstName}&email=${email}`);
    const result = await response.json();

    return response.ok ? { result, ok: true } : { result, ok: false };
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default makeGERequestWithQueryParams('/api/resolutions/');
