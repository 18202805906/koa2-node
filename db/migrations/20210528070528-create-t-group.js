'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('t_group', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER(32),
        comment: '表id'
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING(128),
        comment: '分组名称'
      },
      authParamList: {
        type: Sequelize.STRING(128),
        comment: '授权'
      },
      paramsInfo: {
        type: Sequelize.TEXT,
        comment: '参数信息'
      },
      remark: {
        type: Sequelize.STRING(1024),
        comment: '描述'
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
    await queryInterface.dropTable('t_group');
  }
};