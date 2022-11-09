const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection'); 

// create our comment model
class rating extends Model {}

// Post Information
rating.init(
    // auto
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
        },
      postId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
        model: 'post',
        key: 'id'
        }
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
        model: 'user',
        key: 'id'
        }
      }},
    {
      sequelize,
      freezeTableName: true,
      underscored: true,
      modelName: 'rating'
    }
  );

  // Export the model
  module.exports = rating;