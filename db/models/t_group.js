'use strict';
const {
  Model
} = require('sequelize');
const {formate} = require("../../utils/util");
module.exports = (sequelize, DataTypes) => {
  class t_group extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  t_group.init({
    name: DataTypes.STRING,
    authParamList: DataTypes.STRING,
    paramsInfo: DataTypes.TEXT,
    remark: DataTypes.STRING,
    createTime: {
      type:DataTypes.DATE
    },
    updateTime: {
      type:DataTypes.DATE,
      get(){
        const updateTime = this.getDataValue('updateTime');
        return formate(updateTime, "yyyy-MM-dd hh:mm:ss");

      }
    },
    createBy: DataTypes.STRING,
    updateBy: DataTypes.STRING,
    remove: DataTypes.STRING
  }, {
    sequelize,
    modelName: 't_group',
    createdAt: 'createTime',
    updatedAt: 'updateTime'
  });
  return t_group;
};