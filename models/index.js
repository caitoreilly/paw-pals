// Importing our 3 models MAYBE JUST TWO IF WE ARENT DOING COMMENTS
const user = require('./user');
const post = require('./post');
const rating = require('./rating');

// Associations among models

// Post belongs to the user's Name (NOT THE USERNAME)
post.belongsTo(user, {
    foreignKey: 'userId' //userId is in post model
  });

// User can have many posts
user.hasOne(post, {
   foreignKey: 'userId' // userId is in the post model
});

// Post can have many ratings
post.hasMany(rating, {
  foreignKey: 'postId'  // postId is in rating model
});

// Rating belongs to the user posting it
rating.belongsTo(post, {
  foreignKey: 'postId'
});

// Post can have many ratings
user.hasMany(rating, {
  foreignKey: 'userId'  // postId is in rating model
});

// Rating belongs to the user posting it
rating.belongsTo(user, {
  foreignKey: 'userId'
});

// Exported
module.exports = { user, post, rating };