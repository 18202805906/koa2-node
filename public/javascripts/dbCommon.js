const models = require('../../db/models');
const { SUCCESS } = require("../../utils/resCode");

class DbOperation {
    /**
     * 构造器
     * @param {*} tableName 表名
     */
    constructor(tableName) {
		this.tableName = tableName
	}
    /**
     * 用于分页查询
     * @param {*} ctx koa回调参数
     * @param {*} where 数据库where条件
     */
    async findAndCountAll(ctx, where = {}){
        let {size, current} = ctx.query;
        let offset = (current-1)*size;
        //查询且汇集总数
        let list = await models[this.tableName].findAndCountAll({
            where,
            order: [['updateTime', 'DESC']],
            offset,
            size
        });
        await SUCCESS(
            ctx,
            {
            current: Number(current),
            size:Number(size),
            total: list.count,
            records: list.rows
            },
            "查询成功"
        )
    };
    /**
     * 用于删除
     * @param {*} ctx koa回调参数
     */
     async delete(ctx){
        let id = Number(ctx.params.id);
        let result = await models[this.tableName].update({
            remove:'1'
        },{where:{id}});
        await SUCCESS(ctx, {...result.id}, "删除成功");
     };
     /**
     * 用于单条数据查询
     * @param {*} ctx koa回调参数
     */
      async findOne(ctx){
        let id = Number(ctx.params.id);
        let result = await models[this.tableName].findOne({where:{id}});
        await SUCCESS(
            ctx,
            {
            ...result.dataValues
            },
            "查询成功"
        )
     };
     /**
     * 用于修改数据
     * @param {*} ctx koa回调参数
     */
      async update(ctx){
        await models[this.tableName].update({
            ...ctx.request.body,
        },{where:{id:ctx.request.body.id}});
        await SUCCESS(
            ctx,
            null,
            "修改成功"
        )
     };
     /**
     * 用于新增数据
     * @param {*} ctx koa回调参数
     */
      async create(ctx){
        await models[this.tableName].create({
            ...ctx.request.body
          });
        await SUCCESS(
            ctx,
            null,
            "新增成功"
        )
     };
}

module.exports = DbOperation;