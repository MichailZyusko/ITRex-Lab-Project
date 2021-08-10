/* eslint-disable consistent-return */

export default (req, res) => {
  try {
    res.send(req.body);
  } catch (error) {
    console.error(error);
    return null;
  }
};
