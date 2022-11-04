const { Model, DataTypes } = require('sequelize');

const sequelize = require('/');

// create our comment model
class Rating extends Model {}

// Post Information
Rating.init(
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