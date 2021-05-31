'use strict';
const {
  Model
} = require('sequelize');
const {formate} = require("../../utils/util");
module.exports = (sequelize, DataTypes) => {
  class t_sys_config extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  t_sys_config.init({
    name: DataTypes.STRING,
    versionNum: DataTypes.STRING,
    iconPath: DataTypes.TEXT,
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
    modelName: 't_sys_config',
    createdAt: 'createTime',
    updatedAt: 'updateTime'
  });
  return t_sys_config;
};