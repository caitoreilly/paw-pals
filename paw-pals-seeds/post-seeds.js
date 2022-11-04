const { post } = require('./');

const postData = [
  {
    postTitle: 'post1',
    postDescription: 'post description 1',
    postLocation: 'QUEENS',
    postAvailable: 'MORNING',
    postDog: 'name1',
  },
  {
    postTitle: 'post2',
    postDescription: 'post description 2',
    postLocation: 'burough1',
    postAvailable: 'AFTERNOON',
    postDog: 'name2',
  },
  {
    postTitle: 'post3',
    postDescription: 'post description 3',
    postLocation: 'BROOKLYN',
    postAvailable: 'EVENING',
    postDog: 'name3',
  },
];

const seedPost = () => post.bulkCreate(postData);

module.exports = seedPost;