'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class t_task extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  t_task.init({
    name: DataTypes.STRING,
    code: DataTypes.STRING,
    content: DataTypes.TEXT,
    createTime: DataTypes.DATE,
    updateTime: DataTypes.DATE,
    createBy: DataTypes.STRING,
    updateBy: DataTypes.STRING,
    remove: DataTypes.STRING
  }, {
    sequelize,
    modelName: 't_task',
    timestamps: false,
    createdAt: 'createTime',
    updatedAt: 'updateTime'
  });
  return t_task;
};