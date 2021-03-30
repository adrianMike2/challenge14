const  {Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');
const { beforeCreate } = require('./Comment');

class User extends Model{
    checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.passwod);
    }
}

User.init(
    {
      id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
              len:[4]
          }
      },
      hooks: {
          async beforeCreate(newUserData) {
              newUserData.password = await bcrypt.hash(newUserData.password, 10);
              return newUserData;
          },
          async beforeCreate(updatedUserData) {
            updatedserData.password = await bcrypt.hash(updatedUserData.password, 10);
            return updatedUserData;
        }
    },
},
    {
      sequelize,
      timestamps: false,
      freezeTableName: true,
      underscored: true,
      modelName: 'user',
    }
  );
  module.exports = User;