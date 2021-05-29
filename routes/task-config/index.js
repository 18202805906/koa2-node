const router = require('koa-router')();
const Op = require('sequelize').Op;
const DbOperation = require("../../public/javascripts/dbCommon");
const { SUCCESS } = require("../../utils/resCode");
const { getUuid } = require("../../utils/util");
let dbCommon = new DbOperation('t_task');

//分页查询接口数据
router.get('/jobConfigs/page', async (ctx)=> {
    let { name, code } = ctx.query;
    const where ={
        remove:'0',
        name:{ [Op.like]:'%' +name + '%' },
        code:{ [Op.like]:'%' +code + '%' },
    }
    await dbCommon.findAndCountAll(ctx, where);
});
//获取任务编码
router.get('/jobConfigs/getCode', async(ctx)=>{
    await SUCCESS(ctx, getUuid(), "操作成功");
});
//不分页查询所有数据
router.get('/jobConfigs/all', async(ctx)=>{
    const where ={
        remove:'0'
    }
    await dbCommon.findAll(ctx,where);
});
//获取国家组件认证信息
router.get('/jobConfigs/GovAuthList', async(ctx)=>{
    await new DbOperation('t_gov_auth').findAll(ctx, {remove:'0'});
});

//删除
router.delete('/jobConfigs/:id', async(ctx)=>{
    await dbCommon.delete(ctx);
});
//查询单条数据
router.get('/jobConfigs/:id', async(ctx)=>{
    await dbCommon.findOne(ctx);
});
//修改数据
router.put('/jobConfigs', async(ctx)=>{
    await dbCommon.update(ctx);
});
//新增数据
router.post('/jobConfigs', async(ctx)=>{
    await dbCommon.create(ctx);
});


module.exports = router;
