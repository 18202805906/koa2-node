'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('t_schedul_configs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      scheduleName: {
        allowNull: false,
        type: Sequelize.STRING(128),
        comment: '调度名称',
      },
      jobId: {
        allowNull: false,
        type: Sequelize.INTEGER(8),
        comment: '任务id',
      },
      jobCode: {
        allowNull: false,
        type: Sequelize.STRING(128),
        comment: '任务编码',
      },
      retryNumber: {
        allowNull: false,
        type: Sequelize.INTEGER(8),
        comment: '重试次数',
      },
      shutStatus: {
        allowNull: false,
        type: Sequelize.STRING(128),
        comment: '任务状态',
      },
      timesLimitType: {
        allowNull: false,
        type: Sequelize.STRING(128),
        comment: '任务限制类型',
      },
      timesLimitTotalNumber: {
        allowNull: false,
        type: Sequelize.INTEGER(8),
        comment: '任务限制数',
      },
      executionIntervalUnit: {
        allowNull: false,
        type: Sequelize.STRING(128),
        comment: '执行间隔类型',
      },
      executionIntervalValue: {
        allowNull: false,
        type: Sequelize.INTEGER(8),
        comment: '执行间隔时长',
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
    await queryInterface.dropTable('t_schedul_configs');
  }
};