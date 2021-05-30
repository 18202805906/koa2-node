const router = require('koa-router')({
  //路由前缀
  prefix: '/jobFailRecord'
});
const Op = require('sequelize').Op;
const DbOperation = require("../public/javascripts/dbCommon");
let dbCommon = new DbOperation('t_log_table');

//分页查询接口数据
router.get('/page', async (ctx)=> {
  let { jobName } = ctx.query;
  const where ={
      remove:'0',
      jobName:{ [Op.like]:'%' +jobName + '%' },
  };
  await dbCommon.findAndCountAll(ctx, where);
});

module.exports = router;
