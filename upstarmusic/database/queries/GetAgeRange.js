const Artist = require("../models/artist");

/**
 * Finds the lowest and highest age of artists in the Artist collection
 * @return {promise} A promise that resolves with an object
 * containing the min and max ages, like { min: 16, max: 45 }.
 */
module.exports = () => {
  // First approach is not good because we will pull back ALL the data
  /*return Artist.find()
    .sort({ age: 1 })
    .then(artists => {
      const numArtist = artists.length;
      const ageRange = {
        min: artists[0].age,
        max: artists[numArtist - 1].age
      };
      return ageRange;
    });*/

  const minQuery = Artist.find({})
    .sort({ age: 1 })
    .limit(1)
    .then(artists => artists[0].age);

  const maxQuery = Artist.find({})
    .sort({ age: -1 })
    .limit(1)
    .then(artists => artists[0].age);

  return Promise.all([minQuery, maxQuery]).then(result => {
    return {
      min: result[0],
      max: result[1]
    };
  });
};
