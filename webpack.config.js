const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const nodeExternals = require('webpack-node-externals');
module.exports = {
    mode: 'production',
    entry: path.resolve(__dirname, 'bin/www.js'), //入口文件
    output: {
        path: path.resolve(__dirname, 'dist'), //输出路径
        filename: 'nodeBundle.[hash].js'      // 输出项目根目录
    },
    module: {
        rules:[
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [{
                    loader: 'babel-loader'
                }]
    
            }
        ]
    },
    target: 'node', // 服务端打包
    externals: [nodeExternals(), 'pg-hstore'], //node 打包可去除一些警告
    plugins: [
        new CleanWebpackPlugin(),
    ]
};