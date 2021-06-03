const path = require('path');
const log4js = require('log4js');

// 自定义日志格式
const layout = {
    type: 'pattern',
    pattern: '%d{yyyy-MM-dd hh:mm:ss.SSS} [%p] %m'
};

// 配置log4js
log4js.configure({
    pm2: true,
    appenders: {
        // 控制台输出
        console: { type: 'console' },
        req: {  //请求转发日志
            type: 'dateFile',    //指定日志文件按时间打印
            filename: 'logs/reqlog/req',  //指定输出文件路径
            pattern: 'yyyy-MM-dd.log',
            alwaysIncludePattern: true,
            layout
        },
        err: {  //错误日志
            type: 'dateFile',
            filename: 'logs/errlog/err',
            pattern: 'yyyy-MM-dd.log',
            alwaysIncludePattern: true,
            layout
        },
        oth: {  //其他日志
            type: 'dateFile',
            filename: 'logs/othlog/oth',
            pattern: 'yyyy-MM-dd.log',
            alwaysIncludePattern: true,
            layout
        }
        
    },
    categories: {
        // 默认日志，输出debug 及以上级别的日志
        default: { appenders: [ 'console', 'req' ], level: 'debug' },
        // 错误日志，输出error 及以上级别的日志
        error: { appenders: [ 'console', 'err' ], level: 'error' },
    },
    // 替换console
    replaceConsole: true
});

// 获取默认日志
const defaultLogger = log4js.getLogger();
// 获取错误级别日志
const errorLogger = log4js.getLogger('error');

// 日志代理，同时调用默认日志和错误日志
const loggerProxy = {};
const levels = log4js.levels.levels;
levels.forEach(level => {
    const curLevel = level.levelStr.toLowerCase();
    loggerProxy[curLevel] = (...params) => {
        defaultLogger[curLevel](...params);
        errorLogger[curLevel](...params);
    }
});


module.exports = loggerProxy;