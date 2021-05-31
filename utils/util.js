const sequelize = require('sequelize');
const { DATA_SOURCE_TYPE } = require("./dictionary");

// 生成uuid
const getUuid = function() {
    function S4() {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }
    return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
}
//日期格式转换
const formate = function(date, fmt) { 
    let o = { 
       "M+" : date.getMonth()+1,                 //月份 
       "d+" : date.getDate(),                    //日 
       "h+" : date.getHours(),                   //小时 
       "m+" : date.getMinutes(),                 //分 
       "s+" : date.getSeconds(),                 //秒 
       "q+" : Math.floor((date.getMonth()+3)/3), //季度 
       "S"  : date.getMilliseconds()             //毫秒 
   }; 
   if(/(y+)/.test(fmt)) {
           fmt=fmt.replace(RegExp.$1, (date.getFullYear()+"").substr(4 - RegExp.$1.length)); 
   }
    for(var k in o) {
       if(new RegExp("("+ k +")").test(fmt)){
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
        }
    }
   return fmt; 
}

const connectDb = function(databaseInfo){
    const { datasourceName, username,  password, type, ip, port} = databaseInfo;
    //创建连接数据库的实例
    return  new sequelize(datasourceName, username, password, {
        // the sql dialect of the database
        dialect: DATA_SOURCE_TYPE[type],
        // custom host; default: localhost
        host: ip,
        // custom port; default: dialect default
        port: port
  });
}


module.exports = {
    getUuid,
    formate,
    connectDb
}