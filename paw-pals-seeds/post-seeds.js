const { post } = require('../models');

const postData = [
  {
    postTitle: 'post1',
    postDescription: 'post description 1',
    postLocation: 'burough1',
    postAvailable: 'morning1',
    postDog: '',
  },
];

const seedPost = () => Product.bulkCreate(postData);

module.exports = seedPost;