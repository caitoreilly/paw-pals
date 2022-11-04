const { form } = require('../models');

const formData = [
  {
    username: 'user1',
    password: 'password1',
    name: 'name1',
    userEmail: 'user1@aol.com',
    userAge: 18,
    userBorough: 'QUEENS',
    userAvailable: 'MORNING',
    dogName: 'dogname1',
    dogBreed: 'BULLDOG',
    dogAge: 10,
    dogActivity: 'WALK',
  },
  {
    username: 'user2',
    password: 'password2',
    name: 'name2',
    userEmail: 'user2@aol.com',
    userAge: 28,
    userBorough: 'MANHATTAN',
    userAvailable: 'AFTERNOON',
    dogName: 'dogname2',
    dogBreed: 'GERMAN SHEPHERD',
    dogAge: 20,
    dogActivity: 'FRISBEE',
  },
  {
    username: 'user3',
    password: 'password3',
    name: 'name3',
    userEmail: 'user3@aol.com',
    userAge: 38,
    userBorough: 'BROOKLYN',
    userAvailable: 'EVENING',
    dogName: 'dogname3',
    dogBreed: 'POODLE',
    dogAge: 30,
    dogActivity: 'BALL',
  },
];

const seedForm = () => form.bulkCreate(formData);

module.exports = seedForm;