const Koa = require('koa');
let app = new Koa()
  , logger = require('koa-logger')
  , json = require('koa-json');
  // , views = require('koa-views')
  // , onerror = require('koa-onerror');

const catchError = require("./middleWares/catchError");
const { NotFound } = require("./utils/resCode");

// 全局处理错
app.use(catchError);
// global middlewares
app.use(
	require('koa-bodyparser')({
		enableTypes: ["json", "form", "text"],
	})
)
app.use(json());
app.use(logger());
app.use(require('koa-static')(__dirname + '/public'));

// logger
app.use(async (ctx, next) => {
	const start = new Date()
	await next()
	const ms = new Date() - start
	console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})


// routes
const dataOrigin = require('./routes/dataOrigin');
const task = require('./routes/task-config/index');
const inputParamConfig = require('./routes/task-config/inputParamConfig');
const logTable = require('./routes/logTable');
const schedulConfig = require('./routes/schedulConfig');

// routes definition
app.use(dataOrigin.routes(), dataOrigin.allowedMethods());
app.use(task.routes(), task.allowedMethods());
app.use(logTable.routes(), logTable.allowedMethods());
app.use(schedulConfig.routes(), schedulConfig.allowedMethods());
app.use(inputParamConfig.routes(), inputParamConfig.allowedMethods());

// 404
app.use(async (ctx, next) => {
	await NotFound(ctx)
})

// error-handling
app.on('error', (err, ctx) => {
  const code = err.statusCode || err.status || 500
	if (code === 500) {
		console.error("error>>>", err, ctx)
	}
});

module.exports = app;
