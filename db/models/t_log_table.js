'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class t_log_table extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  t_log_table.init({
    jobName: DataTypes.STRING,
    step: DataTypes.STRING,
    inputParams: DataTypes.TEXT,
    result: DataTypes.TEXT,
    pageIndex: DataTypes.STRING,
    createTime: DataTypes.DATE,
    updateTime: DataTypes.DATE,
    createBy: DataTypes.STRING,
    updateBy: DataTypes.STRING,
    remove: DataTypes.STRING
  }, {
    sequelize,
    modelName: 't_log_table',
    timestamps: false,
    createdAt: 'createTime',
    updatedAt: 'updateTime'
  });
  return t_log_table;
};