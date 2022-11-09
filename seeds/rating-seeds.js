const { rating } = require('../models');

const ratingData = [
  {
    id: 1,
    rating: 4,
    postId: 1,
    userId: 1
  },
  {
    id: 2,
    rating: 5,
    postId:2,
    userId: 2
  },
  {
    id: 3,
    rating: 3,
    postId: 3,
    userId: 3
  },
];

const seedRating = () => rating.bulkCreate(ratingData);

module.exports = seedRating;