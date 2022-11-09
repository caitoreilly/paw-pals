const { post } = require('../models');

const postData = [
  {
    id: 1,
    postTitle: 'post1',
    postDescription: 'post description 1',
    //postLocation: 'QUEENS',
    //postAvailable: 'MORNING',
    userId: 1,
  },
  {
    id: 2,
    postTitle: 'post2',
    postDescription: 'post description 2',
    //postLocation: 'MANHATTAN',
    //postAvailable: 'AFTERNOON',
    userId: 2,
  },
  {
    id: 3,
    postTitle: 'post3',
    postDescription: 'post description 3',
    //postLocation: 'BROOKLYN',
    //postAvailable: 'EVENING',
    userId: 3,
  },
];

const seedPost = () => post.bulkCreate(postData);

module.exports = seedPost;