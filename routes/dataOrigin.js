const router = require('koa-router')();
const Op = require('sequelize').Op;
const DbOperation = require("../public/javascripts/dbCommon");
let dbCommon = new DbOperation('t_data_origin');

//分页查询接口数据
router.get('/dataSourceConfig/page', async (ctx)=> {
  let { aliasName } = ctx.query;
  const where ={
      remove:'0',
      aliasName:{ [Op.like]:'%' +aliasName + '%' },
  };
  await dbCommon.findAndCountAll(ctx, where);
});

//删除
router.delete('/dataSourceConfig/:id', async(ctx)=>{
  await dbCommon.delete(ctx);
});
//查询单条数据
router.get('/dataSourceConfig/:id', async(ctx)=>{
  await dbCommon.findOne(ctx);
});
//修改数据
router.put('/dataSourceConfig', async(ctx)=>{
  await dbCommon.update(ctx);
});
//新增数据
router.post('/dataSourceConfig', async(ctx)=>{
  await dbCommon.create(ctx);
});

module.exports = router;
