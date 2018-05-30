const Artist = require("../models/artist");

/**
 * Sets a group of Artists as not retired
 * @param {array} _ids - An array of the _id's of of artists to update
 * @return {promise} A promise that resolves after the update
 */
module.exports = _ids => {
    // TODO: Try updateMany()
  const criteria = { _id: { $in: _ids } };
  return Artist.update(criteria, { retired: false }, { multi: true });
};
