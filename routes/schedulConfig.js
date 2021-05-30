const router = require('koa-router')({
  //路由前缀
  prefix: '/scheduled-configs'
});
const sequelize = require('sequelize')
const Op = sequelize.Op;
const DbOperation = require("../public/javascripts/dbCommon");
let dbCommon = new DbOperation('t_schedul_config');
const models = require('../db/models');

//分页查询接口数据
router.get('/', async (ctx)=> {
    //表关联
    // models.t_schedul_config.hasOne(models.t_task);
    // models.t_schedul_config.belongsTo(models.t_task, { as:'tt', foreignKey: 'jobId', targetKey: 'id'});
    let { scheduledName,jobName,jobCode } = ctx.query;
    const where ={
        remove:'0',
        scheduleName:{ [Op.like]:'%' +scheduledName + '%' },
        jobName:{ [Op.like]:'%' +jobName + '%' },
        jobCode:{ [Op.like]:'%' +jobCode + '%' },
    };
    //关联查询
    // const include = [{ // include关键字表示关联查询
    //     model: models.t_task, // 指定关联的model
    //     //as:'tt', // 由于前面建立映射关系时为task表起了别名，那么这里也要与前面保持一致，否则会报错
    //     attributes: [['code','jobCode'], ['name','jobName']], // 这里的attributes属性表示查询task表的jobCode和jobName字段
    //     where:{
    //         name:{ [Op.like]:'%' +jobName + '%' },
    //         code:{ [Op.like]:'%' +jobCode + '%' },
    //     }
    // }];
    ctx.query.current = ctx.query.page;
    await dbCommon.findAndCountAll(ctx, where);
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
router.put('/:id', async(ctx)=>{
  await dbCommon.update(ctx);
});
//新增数据
router.post('/', async(ctx)=>{
  await dbCommon.create(ctx);
});
//修改任务状态
router.put('/:id/:shutStatus', async(ctx)=>{
    await dbCommon.update(ctx);
  });
  

module.exports = router;
