'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('t_user', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER(32),
        comment: '表id'
      },
      username: {
        allowNull: false,
        type: Sequelize.STRING(128),
        comment: '用户名称'
      },
      password: {
        type: Sequelize.STRING(128),
        comment: '用户密码'
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
    await queryInterface.dropTable('t_user');
  }
};