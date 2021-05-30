const router = require('koa-router')({
    //路由前缀
    prefix: '/jobConfigs'
});
const Op = require('sequelize').Op;
const DbOperation = require("../../public/javascripts/dbCommon");
const { SUCCESS } = require("../../utils/resCode");
const { getUuid } = require("../../utils/util");
const models = require('../../db/models');
let dbCommon = new DbOperation('t_task');

//分页查询接口数据
router.get('/page', async (ctx)=> {
    let { name, code } = ctx.query;
    const where ={
        remove:'0',
        name:{ [Op.like]:'%' +name + '%' },
        code:{ [Op.like]:'%' +code + '%' },
    }
    await dbCommon.findAndCountAll(ctx, where);
});
//获取任务编码
router.get('/getCode', async(ctx)=>{
    await SUCCESS(ctx, getUuid(), "操作成功");
});
//不分页查询所有数据
router.get('/all', async(ctx)=>{
    const where ={
        remove:'0'
    }
    await dbCommon.findAll(ctx,where);
});
//获取国家组件认证信息
router.get('/GovAuthList', async(ctx)=>{
    await new DbOperation('t_gov_auth').findAll(ctx, {remove:'0'});
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
    await dbCommon.create(ctx);
});
//新增任务配置
router.post('/addConfig', async(ctx)=>{
    const {code, ...configInfo} = ctx.request.body;
    //把配置信息转为字符串进行全部保存
    ctx.request.body = {
        code,
        configInfo: JSON.stringify(configInfo)
    };
    new DbOperation('t_task_config').create(ctx);
});
//修改任务配置
router.put('/updateConfig', async(ctx)=>{
    const {code, ...configInfo} = ctx.request.body;
    //把配置信息转为字符串进行全部保存
    await models['t_task_config'].update({
        code,
        configInfo: JSON.stringify(configInfo)
    },{where:{code}});
    await SUCCESS(
        ctx,
        {code},
        "修改成功"
    )
});
//获取配置信息
router.get('/getConfig/:code', async(ctx)=>{
    let {dataValues:result } = await models['t_task_config'].findOne({where:{code:ctx.params.code}});
    const configInfo = JSON.parse(result.configInfo);
    //删除无用的属性
    delete result.configInfo;
    delete result.code;

    //转换config中的属性名称
    Object.assign(configInfo, {
        apiConfigVo: {
            ...configInfo.apiConfig,
            govAuthConfigVo: configInfo.apiConfig.govAuthConfigDto,
            proAuthConfigVo: configInfo.apiConfig.proAuthConfigDto,
            swAuthConfigVo: configInfo.apiConfig.swAuthConfigDto, 
        },
        inputParamVo: configInfo.inputParamDto,
    });
    //删除多余的属性
    delete configInfo.apiConfig;
    delete configInfo.apiConfigVo.govAuthConfigDto;
    delete configInfo.apiConfigVo.proAuthConfigDto;
    delete configInfo.apiConfigVo.swAuthConfigDto;
    delete configInfo.inputParamDto;
    Object.assign(result, configInfo);
    await SUCCESS(ctx, result, '查询成功');
});


module.exports = router;
