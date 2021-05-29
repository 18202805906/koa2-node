const router = require('koa-router')();
const sequelize = require('sequelize');
// const Op = sequelize.Op;
const models = require('../../db/models');
const DbOperation = require("../../public/javascripts/dbCommon");
const { DATABASE_CONNECTION_FAIL, SUCCESS } = require("../../utils/resCode");
const { connectDb } = require("../../utils/util");
let dbCommon = new DbOperation('t_param_config');

//测试sql
router.get('/inputParamConfig/testSqlCon', async (ctx)=> {
  let { sql,sourceCode } = ctx.query;
  //查询数据源信息
  let databaseInfo = await models.t_data_origin.findOne({where:{code:sourceCode}});
  //连接数据库测试
  const sequelizeLink =  connectDb(databaseInfo);
  try{
    //测试数据库是否连接成功
    await sequelizeLink.authenticate();
    let data = await sequelizeLink.query(sql, { type: sequelize.QueryTypes.SELECT });
    await SUCCESS(ctx, {
        sourceObj: data,
        sample: {name: '$get{name}', code:'$get{code}', user:{age:'$get{age}'}}
    }, "操作成功");
  }catch(error){
    await DATABASE_CONNECTION_FAIL(ctx,error.message);
  }
});

module.exports = router;
