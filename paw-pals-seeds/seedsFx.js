const seedForm = require('./form-seeds');
const seedPost = require('./post-seeds');
const seedComments = require('./comment-seeds');

//!!!!!
// TO DO: SQ CONNECTION LOCATION
const sequelize = require('');
//!!!!

const seedDb = async () => {
  await sequelize.sync({ force: true });
  console.log('\n----- DATABASE SYNCED -----\n');

  await seedForm();
  console.log('\n-- Form Database Seeded --\n');

  await seedPost();
  console.log('\n-- Post Database Seeded --\n');

  await seedComments();
  console.log('\n-- Comment Database Seeded --\n');

  process.exit(0);
};

seedDb();