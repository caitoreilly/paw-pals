const { user } = require('../models');

const userData = [
  {
    id: 1,
    username: 'user1',
    password: 'password1',
    name: 'name1',
    userEmail: 'user1@aol.com',
    userBorough: 'QUEENS',
    userAvailable: 'MORNING',
    dogName: 'dogname1',
    dogBreed: 'BULLDOG',
    dogAge: 10,
    dogActivity: 'WALK',
  },
  {
    id: 2,
    username: 'user2',
    password: 'password2',
    name: 'name2',
    userEmail: 'user2@aol.com',
    userBorough: 'MANHATTAN',
    userAvailable: 'AFTERNOON',
    dogName: 'dogname2',
    dogBreed: 'GERMAN SHEPHERD',
    dogAge: 20,
    dogActivity: 'FRISBEE',
  },
  {
    id: 3,
    username: 'user3',
    password: 'password3',
    name: 'name3',
    userEmail: 'user3@aol.com',
    userBorough: 'BROOKLYN',
    userAvailable: 'EVENING',
    dogName: 'dogname3',
    dogBreed: 'POODLE',
    dogAge: 30,
    dogActivity: 'BALL',
  },
];

const seedUsers = () => user.bulkCreate(userData, {induvidualHooks: true});

module.exports = seedUsers;