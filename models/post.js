const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection'); 

// create our Dog-Post model
class post extends Model {}

// Post Information
post.init(
    // auto
    {
      id: {
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
      // NYC borough -> ref. user borough
     // postLocation: {
       // type: DataTypes.STRING,
       // references: {
       //   model: 'user',
        //  key: 'userBorough'
       // }
      //},
      // morn,aft,eve -> ref. form available
     // postAvailable: {
      //  type: DataTypes.STRING,
        //references: {
        //  model: 'user',
        //  key: 'userAvailable'
      //  } 
     // },
      // posted by what user -> ref. form name
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
        model: 'user',
        key: 'id'
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

// Export the model
module.exports = post;