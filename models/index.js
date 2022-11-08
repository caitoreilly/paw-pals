// Importing our 3 models MAYBE JUST TWO IF WE ARENT DOING COMMENTS
const user = require('./user');
const post = require('./post');
const rating = require('./rating');

// Associations among models

// Post belongs to the user's Name (NOT THE USERNAME)
post.belongsTo(user, {
    foreignKey: 'ID'
  });

// User can have many posts
user.hasMany(post, {
    foreignKey: 'postID'
});

// Post can have many ratings
post.hasMany(rating, {
    foreignKey: 'ratingID'
});

// Rating belongs to the user posting it
rating.belongsTo(user, {
    foreignKey: 'ID'
  });

// Exported
module.exports = { user, post, rating };