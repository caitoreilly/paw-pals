// Importing our 3 models

// !!!!!!!
//TO DO: Add specific locations when finalized folder (if changes from what i pushed)
// !!!!!!!
const form = require('./');
const post = require('./');
const comment = require('./');

// Associations among models

// Post belongs to the user's Name (NOT THE USERNAME)
post.belongsTo(form, {
    foreignKey: 'ID'
  });

// User can have many posts
user.hasMany(post, {
    foreignKey: 'postID'
});

// Post can have many comments
post.hasMany(comment, {
    foreignKey: 'commentID'
});

// Comment belongs to the user posting it
comments.belongsTo(form, {
    foreignKey: 'ID'
  });

// Exported
module.exports = { form, post, comment };