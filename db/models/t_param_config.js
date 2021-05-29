'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class t_param_config extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  t_param_config.init({
    createTime: DataTypes.DATE,
    updateTime: DataTypes.DATE,
    createBy: DataTypes.STRING,
    updateBy: DataTypes.STRING,
    remove: DataTypes.STRING
  }, {
    sequelize,
    modelName: 't_param_config',
    //timestamps: false,
    createdAt: 'createTime',
    updatedAt: 'updateTime',
  });
  return t_param_config;
};