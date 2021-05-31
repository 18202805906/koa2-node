class SuccessModel {
	constructor(code, msg, data, success=true) {
		this.code = code || 200
		this.success = success;
		if(success){
			//this.msg = msg || "操作成功"
			this.message = msg || "操作成功"
		}else{
			this.errMessage = msg || "请求失败"
		}
		if (data) {
			this.data = data
		}
	}
	successFn(ctx) {
		// ctx.set("Content-Type", "application/json;charset=utf8mb4")
		ctx.body = this
	}
}

module.exports = SuccessModel