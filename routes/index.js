const Router = require('koa-router');
// 进行组合
const compose = require('koa-compose');
const router = new Router();


// routes
const login = require('./login');
const sysConfig = require('./sysConfig');
const file = require('./file');
const group = require('./group');
const scene = require('./scene');
const apiCall = require('./apiCall');
const stats = require('./stats');
const image = require('./image');

// routes definition
router.use(login.routes(), login.allowedMethods());
router.use(sysConfig.routes(), sysConfig.allowedMethods());
router.use(file.routes(), file.allowedMethods());
router.use(group.routes(), group.allowedMethods());
router.use(scene.routes(), scene.allowedMethods());
router.use(apiCall.routes(), apiCall.allowedMethods());
router.use(stats.routes(), stats.allowedMethods());
router.use(image.routes(), image.allowedMethods());



module.exports = function () {
    return compose([
        router.routes(),
        router.allowedMethods()
    ])
}