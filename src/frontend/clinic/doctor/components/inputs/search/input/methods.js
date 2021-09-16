const findAllPatientLikeValue = (route) => async (search) => {
  try {
    const response = await fetch(`${route}?search=${search}`);
    const result = await response.json();

    return response.ok ? result : false;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default findAllPatientLikeValue('/api/patients/');
