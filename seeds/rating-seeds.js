const { rating } = require('../models');

const ratingData = [
  {
    ratingID: 1,
    rating: 4,
  },
  {
    ratingID: 2,
    rating: 5,
  },
  {
    ratingID: 3,
    rating: 3,
  },
];

const seedRating = () => rating.bulkCreate(ratingData);

module.exports = seedRating;