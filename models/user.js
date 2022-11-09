const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection'); //insert the location for the connection
// Requires bcrypt for password hashing
const bcrypt = require('bcrypt');

// create our USER & DOG model
class user extends Model {
    // Method to check for password instance in db
    checkPassword(logPass) {
        return bcrypt.compareSync(logPass, this.password);
    }
}

// USER AND DOG Information
user.init(
    // auto
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      // Username
      username: {
        type: DataTypes.STRING,
        allowNull: false
      },
      // Password
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [8]
        }
      },
      // Name
      dogName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      // Email
      userEmail: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isEmail: true
        }
      },
      // Age
      //userAge:  {
        //type: DataTypes.INTEGER,
       // allowNull: false,
        //validate: {
         // max: 100,
          //min: 1
       // }
      //},
      // 5 NYC borough
      userBorough: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isUppercase: true,
          isIn: [['QUEENS', 'MANHATTAN', 'BROOKLYN', 'STATEN ISLAND', 'BRONX']]
        }
      },
      // morning, afternoon, evening, anytime
      userAvailable: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isUppercase: true,
          isIn: [['MORNING', 'AFTERNOON', 'EVENING', 'ANYTIME']]
        }
      },
      // string
      dogName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      // Breed Choices ( no open ended other, just easy last choice 'other')
      dogBreed: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isUppercase: true,
          isIn: [[
            'BULLDOG',
            'GERMAN SHEPHERD',
            'POODLE',
            'FRENCH BULLDOG',
            'GOLDEN RETRIEVER',
            'OTHER'
          ]]
        }
      },
      // integer number
      dogAge: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          max: 40,
          min: 0
        }
      },
      // walk, run, frisbee, ball
      dogActivity: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isUppercase: true,
          isIn: [['WALK', 'FRISBEE', 'BALL', 'RUN', 'OTHER']]
        }
      },
    },
    {
      // Hooks for password hashing
      hooks: {
          async beforeCreate(userData) {
              userData.password = await bcrypt.hash(userData.password, 10);
              return userData;
            },
          async beforeUpdate(updatedData) {
              updatedData.password = await bcrypt.hash(updatedData.password, 10);
              return updatedData;
            }
      },
      sequelize,
      freezeTableName: true,
      underscored: true,
      modelName: 'user'
    }
  )
  // Export the model
  module.exports = user;