const router = require('koa-router')({
    //路由前缀
    prefix: '/sysConfig'
  });
  const { SUCCESS } = require("../utils/resCode");
  const DbOperation = require("../public/javascripts/dbCommon");
  const ParamCheck = require("../middleWares/paramCheck")
  let dbCommon = new DbOperation('t_sys_config');

  //获取配置信息
  router.get('/info', async(ctx)=>{
    await dbCommon.findOne(ctx, {remove:'0'});
  });

  //修改配置信息
  router.post('/addOrUpdate', async(ctx)=>{
    //校验参数
    let schema = {
      name: new ParamCheck().isRequired(),
      versionNum: new ParamCheck().isRequired(),
      iconPath: new ParamCheck().isRequired().isEmpty('图标')
    }
    await ParamCheck.check(ctx.request.body, schema, ctx);
    await dbCommon.update(ctx, {remove:'0'});
  });
  
  module.exports = router;
  