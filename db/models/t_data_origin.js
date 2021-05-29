'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class t_data_origin extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  t_data_origin.init({
    aliasName: DataTypes.STRING,
    type: {
      type: DataTypes.STRING,
      get() {
        const type = this.getDataValue('type');
        return type ? Number(type) : null;
      }
    },
    ip: DataTypes.STRING,
    code: DataTypes.STRING,
    port: DataTypes.INTEGER,
    datasourceName: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    url: DataTypes.STRING,
    createTime: DataTypes.DATE,
    updateTime: DataTypes.DATE,
    createBy: DataTypes.STRING,
    updateBy: DataTypes.STRING,
    remove: DataTypes.STRING
  }, {
    sequelize,
    modelName: 't_data_origin',
    //timestamps: false,
    createdAt: 'createTime',
    updatedAt: 'updateTime',
  });
  return t_data_origin;
};