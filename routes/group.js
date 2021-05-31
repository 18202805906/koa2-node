const router = require('koa-router')({
    //路由前缀
    prefix: '/apiGroup'
  });
  const DbOperation = require("../public/javascripts/dbCommon");
  const ParamCheck = require("../middleWares/paramCheck");
  const models = require('../db/models');
  const { SUCCESS } = require("../utils/resCode");
  const Op = require('sequelize').Op;
  let dbCommon = new DbOperation('t_group');

  //分页查询
  router.post('/pageList', async(ctx)=>{
    let { groupName } = ctx.request.body;
    const where ={remove:'0'};
    groupName && (where.name = { [Op.like]:'%' +groupName + '%' });
    await dbCommon.findAndCountAll(ctx, where);
  });
  //新建分组
  router.post('/addGroup', async(ctx)=>{
    const { name, remark, authParamList, authType, ...paramsInfo } =ctx.request.body;
    //必填参数以及参数类型参数是否为空校验
    let schema = {
      name: new ParamCheck().isString().isRequired().isEmpty('分组名称'),
    }
    await ParamCheck.check(ctx.request.body, schema, ctx);
    ctx.request.body = {
        name,
        remark,
        authParamList: authParamList.length ? JSON.stringify(authParamList): null,
        paramsInfo: JSON.stringify(paramsInfo)
    }
    await dbCommon.create(ctx);
  });
  //删除分组
  router.delete('/delGroup/:id', async(ctx)=>{
    await dbCommon.delete(ctx)
  });
  // 校验分组名称是否存在
  router.get('/ValidGroupName', async(ctx)=>{
    const {groupName: name, id} = ctx.query;
    let result = await models['t_group'].findOne({where:{ name }});
    if(result){
        if(!id){
            await SUCCESS(ctx, name, '分组名称已存在');
            return;
        };
        if(id && result.dataValues.id == id){
            await SUCCESS(ctx, null, '无该分组');
            return;
        }
        await SUCCESS(ctx, name, '分组名称已存在');
    }else{
        await SUCCESS(ctx, null, '无该分组');
    }
  });

  //获取分组信息
  router.get('/selectById/:id', async(ctx)=>{
    let result = await models['t_group'].findOne({where:{id: Number(ctx.params.id)}});
    let datas = result.dataValues;
    datas.authParamList = datas.authParamList ? JSON.parse(datas.authParamList): null;
    Object.assign(datas, JSON.parse(datas.paramsInfo));
    delete datas.paramsInfo
    await SUCCESS(ctx, datas, '查询成功');
  });

    //修改分组
    router.post('/updateGroup', async(ctx)=>{
        const {id, name, remark, authParamList, authType, ...paramsInfo } =ctx.request.body;
        //必填参数以及参数类型参数是否为空校验
        let schema = {
            name: new ParamCheck().isString().isRequired().isEmpty('分组名称'),
        }
        await ParamCheck.check(ctx.request.body, schema, ctx);
        ctx.request.body = {
            name,
            remark,
            authParamList: authParamList.length ? JSON.stringify(authParamList): null,
            paramsInfo: JSON.stringify(paramsInfo)
        }
        await dbCommon.update(ctx, {id: Number(id)});
    });
  
  module.exports = router;
  