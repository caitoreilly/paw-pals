const { Model, DataTypes } = require('sequelize');

// !!!!!!!
//TO DO: insert the location for the connection
// !!!!!!!
const sequelize = require('/');

// create our comment model
class comment extends Model {}

// Post Information
comment.init(
    // auto
    {
      commentID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      commentTitle: {
        type: DataTypes.STRING,
        references: {
            model: 'post',
            key: 'postTitle'
        }
      },
      commentName: {
        type: DataTypes.STRING,
        references: {
            model: 'form',
            key: 'name'
        }
      }
    },
    {
      sequelize,
      freezeTableName: true,
      underscored: true,
      modelName: 'comment'
    }
  );