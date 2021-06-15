const Koa = require('koa');
let app = new Koa()
//   , logger = require('koa-logger')
  , json = require('koa-json');
  // , views = require('koa-views')
  // , onerror = require('koa-onerror');
const cors = require('koa2-cors');  // 引入跨域
const router = require('./routes');

const catchError = require("./middleWares/catchError");
const { NotFound } = require("./utils/resCode");
const jwtKoa = require("./middleWares/tokenAuth/index");
const logger = require('./utils/log4jsLogger'); //上面配置的log4js地址

/**
 * 创建日志代理方法
 * @param logLevel 日志级别
 * @param logger 日志对象
 * @return {function}
 */
 function createLogProxy (logLevel, logger) {
    return (...param) => {
        logger[logLevel](...param);
    };
}
//重写console
console.log = createLogProxy('debug', logger);
console.info = createLogProxy('info', logger);
console.warn = createLogProxy('warn', logger);
console.error = createLogProxy('error', logger);

// 全局处理错
app.use(catchError);
// global middlewares
app.use(
	require('koa-bodyparser')({
		enableTypes: ["json", "form", "text"],
	})
)
app.use(json());
// app.use(logger());
app.use(require('koa-static')(__dirname + '/public'));

// 处理跨域的配置
app.use(cors({
	exposeHeaders: ['WWW-Authenticate', 'Server-Authorization', 'Date'],
	maxAge: 100,
	credentials: true,
	allowMethods: ['GET', 'POST', 'OPTIONS'],
	allowHeaders: ['Content-Type', 'Authorization', 'Accept', 'X-Custom-Header', 'anonymous'],
}))

// logger
app.use(async (ctx, next) => {
	const start = new Date()
	await next()
	const ms = new Date() - start
	console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
})



// jwt,token校验中间件
app.use(
	jwtKoa({ debug: true, secret:'zw121_#jf55' }).unless({
		//登录页面的请求不需要进行token校验
		path: [
			'/login',
			/^\/login\/.*/,
			'/sysConfig/info',
			/^\/public\/.*/,
		],
	})
)

// router(app)
app.use(router())

// 404
app.use(async (ctx, next) => {
	await NotFound(ctx)
})

// error-handling
app.on('error', (err, ctx) => {
  const code = err.statusCode || err.status || 500
	// if (code === 500) {
	// 	console.error("error>>>", err, ctx)
	// }
	console.error("error>>>", err, ctx)
});

module.exports = app;
