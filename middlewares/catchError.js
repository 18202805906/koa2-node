const { ErrorModel } = require('../utils/http-response/httpError')

const format = (err, ctx) => {
  ctx.response.status = err.statusCode
  ctx.response.body = {
    code: err.code,
    errMessage: err.message || err.msg,
    request: ctx.method + ' >> ' + ctx.url
  }
}
module.exports = async (ctx, next) => {
  try {
    await next()
  } catch (err) {
    console.error(`${ctx.method} ${ctx.url}` + err);
    if (err.flag === 'ErrorModel') {
      format(err, ctx)
    } else {
      format(new ErrorModel(), ctx)
    }
  }
}