const { Model, DataTypes } = require('sequelize');
const sequelize = require('/'); //insert the location for the connection

// create our USER & DOG model
class form extends Model {}

// USER AND DOG Information
form.init(
    // auto
    {
      ID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      // Username
      username: {
        type: DataTypes.STRING,
        allowNull: False
      },
      // Password
      password: {
        type: DataTypes.STRING,
        allowNull: False,
        validate: {
            len: [8]
        }
      },
      // Name
      name: {
        type: DataTypes.STRING,
        allowNull: False
      },
      // Email
      userEmail: {
        type: DataTypes.STRING,
        allowNull: False,
        validate: {
            isEmail: true
        }
      },
      // Age
      userAge:  {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      // 5 NYC borough
      userBorough: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      // morning, afternoon, evening
      userAvailable: {
        type: DataTypes.STRING,
        allowNull: false
      },
      // string
      dogName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      // Breed Choices ( no open ended other, just easy last choice 'other')
      dogBreed: {
        type: DataTypes.STRING,
        allowNull: false
      },
      // integer number
      dogAge: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      // walk, run, frisbee, ball
      dogActivity: {
        type: DataTypes.STRING,
        allowNull: false
      },
    },
    {
      sequelize,
      freezeTableName: true,
      underscored: true,
      modelName: 'form'
    }
  );