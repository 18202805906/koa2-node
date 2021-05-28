const router = require('koa-router')();

const models = require('../db/models');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const {
	SUCCESS
} = require("../utils/resCode")


//分页查询接口数据
router.get('/dataSourceConfig/page', async (ctx)=> {
  let {size, current, aliasName} = ctx.query;
  let offset = (current-1)*size;
  //查询且汇集总数
  let list = await models.t_data_origin.findAndCountAll({
      where:{
          remove:'0',
          aliasName:{ [Op.like]:'%' +aliasName + '%' },
      },
      order: [['updateTime', 'DESC']],
      offset,
      size
  });
  await SUCCESS(
    ctx,
    {
      current: Number(current),
      size:Number(size),
      total: list.count,
      records: list.rows
    },
    "查询成功"
  )
});

//删除
router.delete('/dataSourceConfig/:id', async(ctx)=>{
  let id = Number(ctx.params.id);
  let result = await models.t_data_origin.update({
    remove:'1'
  },{where:{id}});
  await SUCCESS(
    ctx,
    {
      ...result.id
    },
    "删除成功"
  )
});
//查询单条数据
router.get('/dataSourceConfig/:id', async(ctx)=>{
  let id = Number(ctx.params.id);
  let result = await models.t_data_origin.findOne({where:{id}});
  await SUCCESS(
    ctx,
    {
      ...result.dataValues
    },
    "查询成功"
  )
});
//修改数据
router.put('/dataSourceConfig', async(ctx)=>{
  await models.t_data_origin.update({
    ...ctx.request.body,
  },{where:{id:ctx.request.body.id}});
  await SUCCESS(
    ctx,
    null,
    "修改成功"
  )
});
//新增数据
router.post('/dataSourceConfig', async(ctx)=>{
  await models.t_data_origin.create({
    ...ctx.request.body
  });
  await SUCCESS(
    ctx,
    null,
    "新增成功"
  )
});


module.exports = router;
