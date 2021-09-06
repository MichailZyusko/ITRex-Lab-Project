const findAllPatientLikeValue = (route) => async (serch) => {
  try {
    // TODO спросить насчет собаки в параметрах
    const response = await fetch(`${route}?search=${serch}`);
    const result = await response.json();

    return response.ok ? result : false;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default findAllPatientLikeValue('/api/clients/');
