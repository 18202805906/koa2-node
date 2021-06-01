const router = require('koa-router')({
    //路由前缀
    prefix: '/api'
});
const DbOperation = require("../public/javascripts/dbCommon");
const ParamCheck = require("../middleWares/paramCheck");
const models = require('../db/models');
const { SUCCESS } = require("../utils/resCode");
const Op = require('sequelize').Op;
let dbCommon = new DbOperation('t_scene');

//分页查询
router.post('/queryApiList', async(ctx)=>{
    let { name } = ctx.request.body;
    const where ={remove:'0'};
    name && (where.name = { [Op.like]:'%' +name + '%' });
    await dbCommon.findAndCountAll(ctx, where);
});
//新建场景
router.post('/add', async(ctx)=>{
    const { 
        name, 
        apiUrl, 
        apiMethod, 
        responseContentType,
        dataShowPath,
        apiGroup,
        timeout,
        description,
        iconPath,
        authParamList,
        dataShowJson,
        contentType,
        successCondition,
        ...paramsInfo 
    } =ctx.request.body;
    //必填参数以及参数类型参数是否为空校验
    let schema = {
        name: new ParamCheck().isString().isRequired().isEmpty('场景名称'),
    }
    await ParamCheck.check(ctx.request.body, schema, ctx);

    ctx.request.body = {
        name, 
        apiUrl, 
        apiMethod, 
        responseContentType,
        dataShowPath,
        apiGroupId: apiGroup,
        timeout,
        description,
        iconPath,
        authParamList,
        dataShowJson: JSON.stringify(dataShowJson),
        contentType,
        successCondition,
        authParamList: authParamList.length ? JSON.stringify(authParamList): null,
        paramsInfo: JSON.stringify(paramsInfo)
    }
    //查询分组名称
    if(apiGroup){
        let { dataValues } = await models['t_group'].findOne({where:{id:Number(apiGroup)}});
        ctx.request.body.apiGroupName = dataValues.name;
    }
    await dbCommon.create(ctx);
});
//删除场景
router.delete('/delApi/:id', async(ctx)=>{
    await dbCommon.delete(ctx)
});

//获取场景信息
router.get('/getApiInfoById/:id', async(ctx)=>{
    let result = await models['t_scene'].findOne({where:{id: Number(ctx.params.id)}});
    let datas = result.dataValues;
    datas.authParamList = datas.authParamList ? JSON.parse(datas.authParamList): null;
    datas.dataShowJson = datas.dataShowJson ? JSON.parse(datas.dataShowJson): null;
    Object.assign(datas, JSON.parse(datas.paramsInfo));
    datas.apiGroup = Number(datas.apiGroupId);
    delete datas.paramsInfo
    await SUCCESS(ctx, datas, '查询成功');
});

//修改场景
router.put('/updateApi', async(ctx)=>{
    const { 
        id,
        name, 
        apiUrl, 
        apiMethod, 
        responseContentType,
        dataShowPath,
        apiGroup,
        timeout,
        description,
        iconPath,
        authParamList,
        dataShowJson,
        contentType,
        successCondition,
        ...paramsInfo 
    } =ctx.request.body;
    //必填参数以及参数类型参数是否为空校验
    let schema = {
        name: new ParamCheck().isString().isRequired().isEmpty('场景名称'),
    }
    await ParamCheck.check(ctx.request.body, schema, ctx);

    ctx.request.body = {
        name, 
        apiUrl, 
        apiMethod, 
        responseContentType,
        dataShowPath,
        apiGroupId: apiGroup ? apiGroup: null,
        timeout,
        description,
        iconPath,
        authParamList,
        dataShowJson: JSON.stringify(dataShowJson),
        contentType,
        successCondition,
        authParamList: authParamList.length ? JSON.stringify(authParamList): null,
        paramsInfo: JSON.stringify(paramsInfo)
    }
    //查询分组名称
    if(apiGroup){
        let { dataValues } = await models['t_group'].findOne({where:{id:Number(apiGroup)}});
        ctx.request.body.apiGroupName = dataValues.name;
    }else{
        ctx.request.body.apiGroupName = null;
    }
    await dbCommon.update(ctx, {id: Number(id)});
});
  
  module.exports = router;
  