/* eslint-disable consistent-return */

module.exports = (req, res) => {
  try {
    res.send(req.body);
  } catch (error) {
    console.error(error);
    return null;
  }
};
