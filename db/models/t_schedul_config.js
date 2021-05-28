'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class t_schedul_config extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  t_schedul_config.init({
    scheduleName: DataTypes.STRING,
    jobId: DataTypes.INTEGER,
    jobCode: DataTypes.STRING,
    retryNumber: DataTypes.INTEGER,
    shutStatus: DataTypes.STRING,
    timesLimitType: DataTypes.STRING,
    timesLimitTotalNumber: DataTypes.INTEGER,
    executionIntervalUnit: DataTypes.STRING,
    executionIntervalValue: DataTypes.INTEGER,
    createTime: DataTypes.DATE,
    updateTime: DataTypes.DATE,
    createBy: DataTypes.STRING,
    updateBy: DataTypes.STRING,
    remove: DataTypes.STRING
  }, {
    sequelize,
    modelName: 't_schedul_config',
    timestamps: false,
    createdAt: 'createTime',
    updatedAt: 'updateTime'
  });
  return t_schedul_config;
};