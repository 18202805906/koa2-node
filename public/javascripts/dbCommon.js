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
    async findAndCountAll(ctx, where = {}, include=[]){
        let {size, current} = ctx.query;
        let offset = (Number(current)-1)*size;
        //查询且汇集总数
        let list = await models[this.tableName].findAndCountAll({
            where,
            order: [['updateTime', 'DESC']],
            offset,
            size: Number(size),
            //用于关联查询
            include,
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
      async findOne(ctx, where={id: Number(ctx.params.id)}){
        let result = await models[this.tableName].findOne({where});
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
     * @param {*} where 查询条件
     */
      async update(ctx, where={id:params.id}){
        let params = Object.keys(ctx.request.body).length ?  ctx.request.body: ctx.params;
        await models[this.tableName].update({
            ...params
        },{where});
        await SUCCESS(
            ctx,
            where,
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
            {},
            "新增成功"
        )
     };
     /**
     * 部分也查询数据
     * @param {*} ctx koa回调参数
     * @param {*} where 查询条件
     * @param {*} attributes 查询的字段
     */
      async findAll(ctx,where={},attributes=null){
        let list = await models[this.tableName].findAll({
            attributes,
            where
        });
        await SUCCESS(
            ctx,
            list,
            "查询成功"
        )
     };
}

module.exports = DbOperation;