const { form } = require('../models');

const formData = [
  {
    username: 'user1',
    password: 'pass1',
    name: 'name1',
    userEmail: 'user1@aol.com',
    userAge: 1,
    userBorough: 'borough1',
    userAvailable: 'morning1',
    dogName: 'dog1',
    dogBreed: 'dogbreed1',
    dogAge: 1,
    dogActivity: 'walk1',
  },
  {
    username: 'user2',
    password: 'pass2',
    name: 'name2',
    userEmail: 'user2@aol.com',
    userAge: 2,
    userBorough: 'borough2',
    userAvailable: 'morning2',
    dogName: 'dog2',
    dogBreed: 'dogbreed2',
    dogAge: 2,
    dogActivity: 'walk2',
  },
  {
    username: 'user3',
    password: 'pass3',
    name: 'name3',
    userEmail: 'user3@aol.com',
    userAge: 3,
    userBorough: 'borough3',
    userAvailable: 'morning3',
    dogName: 'dog3',
    dogBreed: 'dogbreed3',
    dogAge: 3,
    dogActivity: 'walk3',
  },
];

const seedForm = () => Product.bulkCreate(formData);

module.exports = seedForm;