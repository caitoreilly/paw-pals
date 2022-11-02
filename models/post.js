const { Model, DataTypes } = require('sequelize');

// !!!!!!!
//TO DO: insert the location for the connection
// !!!!!!!
const sequelize = require('/'); 

// create our Dog-Post model
class post extends Model {}

// Post Information
post.init(
    // auto
    {
      postID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      // Generic post title
      postTitle: {
        type: DataTypes.STRING,
        allowNull: false
      },
      // Generic post description
      postDescription: {
        type: DataTypes.STRING,
        allowNull: false
      },
      // NYC borough -> ref. form borough
      postLocation: {
        type: DataTypes.STRING,
        references: {
          model: 'form',
          key: 'userBorough'
        }
      },
      // morn,aft,eve -> ref. form available
      postAvailable: {
        type: DataTypes.String,
        references: {
          model: 'form',
          key: 'userAvailable'
        } 
      },
      // posted by what user -> ref. form name
      postDog: {
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
      modelName: 'post'
    }
  );