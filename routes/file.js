const router = require('koa-router')({
    //路由前缀
    prefix: '/file'
  });
const path = require("path");
const {upload} = require("../middlewares/upload");
const { 
    SUCCESS
} = require("../utils/resCode");

router.post('/uploadIcon',upload.single('icon'),async (ctx) => {
    const dirPath = module.parent.path;
    await SUCCESS(ctx, path.join(dirPath, ctx.req.file.path), '上传成功');
});


  module.exports = router;
  