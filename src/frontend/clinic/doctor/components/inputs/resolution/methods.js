const findResolutionByID = (route) => async (resolutionID) => {
  try {
    // TODO спросить насчет собаки в параметрах
    const response = await fetch(`${route}?resolutionID=${resolutionID}`);
    const result = await response.json();

    if (response.ok) {
      return result;
    }

    alert(`Error ${result.message}`);
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default findResolutionByID('/api/resolutions/id');
