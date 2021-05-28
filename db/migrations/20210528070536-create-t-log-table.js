'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('t_log_tables', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER(32)
      },
      jobName: {
        type: Sequelize.STRING(128),
        comment: '任务名称'
      },
      step: {
        type: Sequelize.STRING(128),
        comment: '环节'
      },
      inputParams: {
        type: Sequelize.TEXT,
        comment: '入参'
      },
      result: {
        type: Sequelize.TEXT,
        comment: '出参'
      },
      pageIndex: {
        type: Sequelize.STRING(256),
        comment: '游标'
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
    await queryInterface.dropTable('t_log_tables');
  }
};