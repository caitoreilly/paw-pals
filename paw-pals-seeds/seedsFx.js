const seedCategories = require('./');
const seedProducts = require('./');
const seedTags = require('./');
const seedProductTags = require('./');


//!!!!!
// TO DO: CONNECTION LOCATION
//!!!!

const sequelize = require('');

const seedDb = async () => {
  await sequelize.sync({ force: true });
  console.log('\n----- DATABASE SYNCED -----\n');

  await seedCategories();
  console.log('\n-- Form Database Seeded --\n');

  await seedProducts();
  console.log('\n-- Post Database Seeded --\n');

  await seedTags();
  console.log('\n-- Comment Database Seeded --\n');

  process.exit(0);
};

seedDb();