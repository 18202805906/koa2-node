const router = require('koa-router')({
    //路由前缀
    prefix: '/apiCall'
});
const axios = require('axios');
const DbOperation = require("../public/javascripts/dbCommon");
const { SUCCESS, NotFound } = require("../utils/resCode");
const Op = require('sequelize').Op;
const { RELATION_TYPE } = require("../utils/dictionary");
let dbCommon = new DbOperation('t_scene');
const models = require('../db/models');

//调用接口测试
router.post('/testCall', async(ctx)=>{
    let { 
        apiUrl, 
        apiMethod, 
        timeout,
        contentType,
        headers,
        params,
        body
    } = ctx.request.body;
    headers = headers?  JSON.parse(headers): {};
    params = params?  JSON.parse(params): {};
   //发起请求
   await axios({
       method: apiMethod,
       url:apiUrl,
       params: params,
       headers:{
        ...headers,
        'Content-Type': contentType,
       },
       timeout,
    }).then( async (res)=>{
        await SUCCESS(ctx, res.data, '操作成功' )
    }).catch(async (err)=>{
        await SUCCESS(ctx, err.message, '操作失败' )
    })
});

//接口调用
router.post('/call', async(ctx)=>{
    let { 
        apiId,
        params,
        headers,
        bodys
    } = ctx.request.body;
    headers = headers?  JSON.parse(headers): {};
    params = params?  JSON.parse(params): {};
    bodys = bodys?  JSON.parse(bodys): {};
    //查询场景数据
    let { dataValues } = await models['t_scene'].findOne({where:{id:Number(apiId)}});
    let {
        apiUrl, 
        apiMethod, 
        dataShowPath,
        timeout,
        dataShowJson,
        contentType,
        successCondition
    } = dataValues;
    const startTime = new Date();
   //发起请求
   await axios({
       method: apiMethod,
       url:apiUrl,
       params: params,
       headers:{
        ...headers,
        'Content-Type': contentType,
       },
       timeout,
       data:bodys,

    }).then( async (res)=>{
        const duration  = new Date() - startTime;
        const {codeRelation, httpCodeValue} = JSON.parse(successCondition).httpStatus;
        if(res.status == httpCodeValue){
            //处理需要展示的字段 TODO
            dataShowJson = JSON.parse(dataShowJson);
            await SUCCESS(ctx, {
                showBody: JSON.stringify(dataShowPath ? res.data[dataShowPath]: res.data),
                state: 1,
                time: duration,
                headerSize: JSON.stringify(res.headers).length * 2,
                responseSize: JSON.stringify(res.config).length * 2,
                bodySize: JSON.stringify(res.data).length * 2,
            }, '操作成功' );
            return
        }
        await SUCCESS(ctx,{ 
            state: 1,
            time: duration,
            headerSize: JSON.stringify(res.headers).length * 2,
            responseSize: JSON.stringify(res.config).length * 2,
            bodySize: JSON.stringify(res.data).length * 2,
        }, '不符合成功的code码' )
    }).catch(async (err)=>{
        const duration  = new Date() - startTime;
        await SUCCESS(ctx, 
            { 
                state: 1,
                time: duration,
            },
            '操作失败' )
    })
});

module.exports = router;