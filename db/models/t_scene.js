'use strict';
const {
  Model
} = require('sequelize');
const {formate} = require("../../utils/util");
module.exports = (sequelize, DataTypes) => {
  class t_scene extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  t_scene.init({
    name: DataTypes.STRING,
    apiUrl: DataTypes.TEXT,
    apiMethod: DataTypes.STRING,
    responseContentType: DataTypes.STRING,
    dataShowPath: DataTypes.STRING,
    apiGroupId: DataTypes.STRING,
    timeout: DataTypes.INTEGER,
    description: DataTypes.STRING,
    successCondition: DataTypes.STRING,
    iconPath: DataTypes.STRING,
    contentType: DataTypes.STRING,
    authParamList: DataTypes.STRING,
    paramsInfo: DataTypes.TEXT,
    dataShowJson: DataTypes.TEXT,
    apiGroupName: DataTypes.STRING,
    createTime: {
      type:DataTypes.DATE,
      get(){
        const createTime = this.getDataValue('createTime');
        return createTime ? formate(createTime, "yyyy-MM-dd hh:mm:ss"): null;
      },
      set(){
        return new Date();
      }
    },
    updateTime: {
      type:DataTypes.DATE
    },
    createBy: DataTypes.STRING,
    updateBy: DataTypes.STRING,
    remove: DataTypes.STRING
  }, {
    sequelize,
    modelName: 't_scene',
    createdAt: 'createTime',
    updatedAt: 'updateTime'
  });
  return t_scene;
};