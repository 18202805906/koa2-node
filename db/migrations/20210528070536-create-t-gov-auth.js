'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('t_gov_auths', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER(32)
      },
      name: {
        type: Sequelize.STRING(128),
        comment: '组件名称'
      },
      nationalPluginConfigCode: {
        type: Sequelize.STRING(128),
        comment: '编码'
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
    await queryInterface.dropTable('t_gov_auths');
  }
};