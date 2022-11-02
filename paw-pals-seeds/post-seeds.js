const { post } = require('./');

const postData = [
  {
    postTitle: 'post1',
    postDescription: 'post description 1',
    postLocation: 'burough1',
    postAvailable: 'morning1',
    postDog: '',
  },
];

const seedPost = () => post.bulkCreate(postData);

module.exports = seedPost;