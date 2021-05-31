//pm2的启动配置，pm2 init进行初始化
module.exports = {
  apps : [{
    //启动脚本路径
    script: 'app.js',
    watch: false,
    //开启实例个数,在cluster模式下有效
    //instances: 2,
    //自动重启
    autorestart: true,
    //启动时占用的最大内存
    max_memory_restart: '1G',
    env:{
      NODE_ENV: 'devlopmeent'
    },
    env_production:{
      NODE_ENV: "production"
    }
  }]
};