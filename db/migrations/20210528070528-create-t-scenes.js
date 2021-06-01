'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('t_scenes', {
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
        comment: '场景名称'
      },
      apiUrl: {
        allowNull: false,
        type: Sequelize.TEXT,
        comment: '场景地址'
      },
      apiMethod: {
        allowNull: false,
        type: Sequelize.STRING(128),
        comment: '方法'
      },
      responseContentType: {
        allowNull: false,
        type: Sequelize.STRING(128),
        comment: '响应类型'
      },
      dataShowPath: {
        type: Sequelize.STRING(1024),
        comment: '数据路径'
      },
      apiGroupId: {
        type: Sequelize.STRING(128),
        comment: '分组'
      },
      contentType: {
        type: Sequelize.STRING(128),
        comment: 'body类型'
      },
      timeout: {
        allowNull: false,
        type: Sequelize.INTEGER(8),
        comment: '数据路径'
      },
      description: {
        type: Sequelize.STRING(1024),
        comment: '描述'
      },
      apiGroupName: {
        type: Sequelize.STRING(128),
        comment: '分组名称'
      },
      successCondition: {
        allowNull: false,
        type: Sequelize.STRING(1024),
        comment: '成功标志'
      },
      iconPath: {
        type: Sequelize.STRING(1024),
        comment: '图片地址'
      },
      dataShowJson: {
        type: Sequelize.TEXT,
        comment: '返回字段'
      },
      authParamList: {
        type: Sequelize.STRING(128),
        comment: '授权'
      },
      paramsInfo: {
        type: Sequelize.TEXT,
        comment: '参数信息'
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
    await queryInterface.dropTable('t_scenes');
  }
};