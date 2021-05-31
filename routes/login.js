const router = require('koa-router')({
    //路由前缀
    prefix: '/login'
  });
  const { 
    SUCCESS,
    PARAM_NOT_COMPLETE,
    USER_ACCOUNT_NOT_EXIST,
    USER_PWD_ERROR
   } = require("../utils/resCode");
  const { getPublicKey, decrypted } = require("../utils/cryp");
  const { tokenSign } = require("../utils/token");
  const { getCaptcha } = require("../utils/captcha");
  const DbOperation = require("../public/javascripts/dbCommon");
  const models = require('../db/models');
  const ParamCheck = require("../middleWares/paramCheck")
  let dbCommon = new DbOperation('t_user');

  //用户登录
  router.post('/', async(ctx)=>{
    const { username, password, captchaValue, captchaKey } =ctx.request.body;

    //必填参数以及参数类型参数是否为空校验
    let schema = {
      username: new ParamCheck().isString().isRequired(),
      password: new ParamCheck().isString().isRequired(),
      captchaValue: new ParamCheck().isString().isRequired().isEmpty('验证码')
    }
    await ParamCheck.check(ctx.request.body, schema, ctx);

    if(captchaValue.toLowerCase() != captchaKey.toLowerCase()){
      await PARAM_NOT_COMPLETE(ctx, '验证码输入错误，请重新输入！');
    }
    //根据用户名查询用户信息
    let result = await models['t_user'].findOne({where:{username}});
    if(!result){
      await USER_ACCOUNT_NOT_EXIST(ctx);
      return;
    }
    //解密用户密码
    const pwd = decrypted(password);
    //校验密码是否正确
    if(result.dataValues.password !== pwd){
      await USER_PWD_ERROR(ctx);
    }
    //生成用户token
    const token = tokenSign({username, password: pwd});
    await SUCCESS(ctx, {
      name: username,
      accessToken: token,
      refreshToken: token
    }, '登录成功');
  });
  //获取公钥
  router.get('/public-key', async(ctx)=>{
    const publicKey = getPublicKey();
    await SUCCESS(ctx, publicKey, "查询成功");
  });
  //生成验证码
  router.get('/captcha', async(ctx)=>{
    const captcha = getCaptcha();
    await SUCCESS(ctx, captcha, "查询成功");
  });
    
  
  module.exports = router;
  