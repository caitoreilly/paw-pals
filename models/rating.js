const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection'); 

// create our comment model
class rating extends Model {}

// Post Information
rating.init(
    // auto
    {
      ratingID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
        }
      },
    {
      sequelize,
      freezeTableName: true,
      underscored: true,
      modelName: 'rating'
    }
  );

  // Export the model
  module.exports = rating;