const findAllPatientLikeValue = (route) => async (search) => {
  try {
    const response = await fetch(`${route}?search=${search}`);
    const result = await response.json();

    if (response.status === 302) {
      window.location = result.url;
    }

    return response.ok ? result : false;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default findAllPatientLikeValue('/api/patients/');
