const { comment } = require('./');

const commentData = [
  {
    commentTitle: 'comment1',
    commentName: 'comment description 1',
  },
  {
    commentTitle: 'comment2',
    commentName: 'comment description 2',
  },
  {
    commentTitle: 'comment3',
    commentName: 'comment description 3',
  },
];

const seedComment = () => comment.bulkCreate(commentData);

module.exports = seedComment;