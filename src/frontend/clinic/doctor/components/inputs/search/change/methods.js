const makeGERequestWithQueryParams = (route) => async (patientID) => {
  try {
    // TODO спросить насчет собаки в параметрах
    const response = await fetch(`${route}patient/${patientID}`);
    const result = await response.json();

    return response.ok ? { result, ok: true } : { result, ok: false };
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default makeGERequestWithQueryParams('/api/resolutions/');
