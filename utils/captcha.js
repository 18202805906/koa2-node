
const svgCaptcha = require('svg-captcha');
//生成验证码
const getCaptcha = function(){
    const codeConfig = {
        size: 4,// 验证码长度
        ignoreChars: '0o1i', // 验证码字符中排除 0o1i
        noise: 2, // 干扰线条的数量
        height: 44,
        color:true 
    }
    const captcha = svgCaptcha.create(codeConfig);
    return {
        captchaImg: captcha.data,
        captchaKey: captcha.text.toLowerCase()
    }
}

module.exports ={
    getCaptcha
}