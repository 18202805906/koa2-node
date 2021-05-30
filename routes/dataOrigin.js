const router = require('koa-router')({
  //路由前缀
  prefix: '/dataSourceConfig'
});
const Op = require('sequelize').Op;
const DbOperation = require("../public/javascripts/dbCommon");
const { getUuid ,connectDb } = require("../utils/util");
const models = require('../db/models');
const sequelize = require('sequelize');
const { DATABASE_CONNECTION_FAIL, SUCCESS } = require("../utils/resCode");
let dbCommon = new DbOperation('t_data_origin');

//分页查询接口数据
router.get('/page', async (ctx)=> {
  let { aliasName } = ctx.query;
  const where ={remove:'0'};
  aliasName && (where.aliasName = aliasName);
  await dbCommon.findAndCountAll(ctx, where);
});

//获取全部的数据
router.get('/getAll', async(ctx)=>{
  await dbCommon.findAll(ctx,{remove:'0'});
});
//获取数据源下的表
router.get('/tableNameListByDbCode', async(ctx)=>{
  let { dataSourceCode } = ctx.query; 
  //查询数据源信息
  const databaseInfo = await models.t_data_origin.findOne({where:{code:dataSourceCode}});
  //连接数据库测试
  const sequelizeLink =  connectDb(databaseInfo);
  try{
    const sql = `select TABLE_NAME from INFORMATION_SCHEMA.TABLES  where TABLE_SCHEMA='${databaseInfo.datasourceName}'`
    //测试数据库是否连接成功
    let data = await sequelizeLink.query(sql, { type: sequelize.QueryTypes.SELECT });
    data = data.map(e=>{return e = e.TABLE_NAME});
    await SUCCESS(ctx, data, "操作成功");
  }catch(error){
    await DATABASE_CONNECTION_FAIL(ctx,error.message);
  }

});
//获取表字段
router.get('/fieldListByTableName', async(ctx)=>{
  let { dataSourceCode, tableName } = ctx.query; 
  //查询数据源信息
  const databaseInfo = await models.t_data_origin.findOne({where:{code:dataSourceCode}});
  //连接数据库测试
  const sequelizeLink =  connectDb(databaseInfo);
  try{
    const sql = `select COLUMN_NAME 
      from information_schema.columns 
      where table_name='${tableName}' and table_schema='${databaseInfo.datasourceName}'`;
    //测试数据库是否连接成功
    let data = await sequelizeLink.query(sql, { type: sequelize.QueryTypes.SELECT });
    data = data.map(e=>{return e = e.COLUMN_NAME});
    await SUCCESS(ctx, data, "操作成功");
  }catch(error){
    await DATABASE_CONNECTION_FAIL(ctx,error.message);
  }

});
//删除
router.delete('/:id', async(ctx)=>{
  await dbCommon.delete(ctx);
});
//查询单条数据
router.get('/:id', async(ctx)=>{
  await dbCommon.findOne(ctx);
});
//修改数据
router.put('', async(ctx)=>{
  await dbCommon.update(ctx);
});
//新增数据
router.post('', async(ctx)=>{
  ctx.request.body.code = getUuid();
  await dbCommon.create(ctx);
});

module.exports = router;
