const seedUsers = require('./user-seeds');
const seedPosts = require('./post-seeds');
const seedRatings = require('./rating-seeds');

const sequelize = require('../config/connection');

const seedDb = async () => {
  await sequelize.sync({ force: true });
  console.log('\n----- DATABASE SYNCED -----\n');

  await seedUsers();
  console.log('\n-- User Database Seeded --\n');

  await seedPosts();
  console.log('\n-- Post Database Seeded --\n');

  await seedRatings();
  console.log('\n-- Ratings Database Seeded --\n');

  process.exit(0);
};

seedDb();