'use strict';
const {
  Model
} = require('sequelize');
const {formate} = require("../../utils/util");
module.exports = (sequelize, DataTypes) => {
  class t_user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  t_user.init({
    userName: DataTypes.STRING,
    password: DataTypes.STRING,
    createTime: {
      type:DataTypes.DATE,
      get(){
        const createTime = this.getDataValue('createTime');
        return formate(createTime, "yyyy-MM-dd hh:mm:ss");

      }
    },
    updateTime: DataTypes.DATE,
    createBy: DataTypes.STRING,
    updateBy: DataTypes.STRING,
    remove: DataTypes.STRING
  }, {
    sequelize,
    modelName: 't_user',
    createdAt: 'createTime',
    updatedAt: 'updateTime'
  });
  return t_user;
};