const router = require('koa-router')({
    //路由前缀
    prefix: '/stats'
  });
const { SUCCESS } = require("../utils/resCode");

  //查询
router.post('/count-ranking', async(ctx)=>{

    await SUCCESS(ctx, [], '查询成功')
});

//查询
router.post('/proportion-ranking', async(ctx)=>{

    await SUCCESS(ctx, [], '查询成功')
});

//查询
router.post('/', async(ctx)=>{

    await SUCCESS(ctx, [], '查询成功')
});
  
module.exports = router;
  