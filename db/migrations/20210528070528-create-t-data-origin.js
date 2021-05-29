'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('t_data_origins', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER(32),
        comment: '表id'
      },
      aliasName: {
        allowNull: false,
        type: Sequelize.STRING(128),
        comment: '数据源名称'
      },
      code: {
        type: Sequelize.STRING(128),
        comment: '编码'
      },
      type: {
        allowNull: false,
        type: Sequelize.STRING(128),
        comment: '数据源类型'
      },
      ip: {
        allowNull: false,
        type: Sequelize.STRING(128),
        comment: 'ip地址'
      },
      port: {
        allowNull: false,
        type: Sequelize.INTEGER(16),
        comment: '端口'
      },
      datasourceName: {
        allowNull: false,
        type: Sequelize.STRING(128),
        comment: '数据库名'
      },
      username: {
        allowNull: false,
        type: Sequelize.STRING(128),
        comment: '连接url'
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING(128),
        comment: '用户名'
      },
      url: {
        allowNull: false,
        type: Sequelize.STRING(128),
        comment: '密码'
      },
      remove: {
        defaultValue: '0',
        type: Sequelize.STRING(1),
        comment: '逻辑删除'
      },
      createTime: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
        comment: '创建时间'
      },
      updateTime: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
        comment: '修改时间'
      },
      createBy: {
        type: Sequelize.STRING(128),
        comment: '创建人'
      },
      updateBy: {
        type: Sequelize.STRING(128),
        comment: '修改人'
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('t_data_origins');
  }
};