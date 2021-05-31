const router = require('koa-router')({
    //路由前缀
    prefix: '/sysConfig'
  });
  const { SUCCESS } = require("../utils/resCode");
  const DbOperation = require("../public/javascripts/dbCommon");
  let dbCommon = new DbOperation('t_sys_config');

  //获取配置信息
  router.get('/info', async(ctx)=>{
    await dbCommon.findOne(ctx, {remove:'0'});
  });
    
  
  module.exports = router;
  