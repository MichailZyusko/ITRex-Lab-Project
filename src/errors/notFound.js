export default (client) => {
  if (!client) {
    // throw new ApiError (204,'Nothing was found for your query' );
    return { result: 'Nothing was found for your query' };
  }

  return null;
};
