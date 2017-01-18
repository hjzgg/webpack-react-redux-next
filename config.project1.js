var config = require('./webpack.config');
//打印启动信息
config.initPrint(__filename);
var path = require('path'); 
var cwd = process.cwd();//返回运行当前脚本的工作目录的路径
var baseRoot = "./apps/project1/src/"
var options = {
  //定义标识名(如果有多个应用，可以写成 应用的名称)
  key : 'project1',
  //定义各模块的入口
  modules : {
    bundle: './project1-index.js'//入口
  }
  //根目录
  ,rootPath:__dirname
  //webpack-dev-server启动的端口
  ,port:8000
  //相对路径
  //,path: path.join(__dirname, '')
  //编译后的路径
  //,filename: '[name]/build/bundle.js'
  //定义各种加载器
  //,loaders: []
  //定义各种插件
  //,plugins:[]
  //定义路径别名，即:require(alias)
  , alias: {
    "styles": path.join(cwd, baseRoot + "styles"),
    "less": path.join(cwd, baseRoot + "styles/less"),
    "actions": path.join(cwd,baseRoot + "actions"),
    "constants": path.join(cwd, baseRoot + "constants"),
    "images": path.join(cwd, baseRoot + "images"),
    "reducers": path.join(cwd, baseRoot + "reducers"),
    "stores": path.join(cwd, baseRoot + "stores"),
    "modules": path.join(cwd, baseRoot + "modules"),
    "components": path.join(cwd, baseRoot + "components"),
    "utils": path.join(cwd, baseRoot + "utils"),
    "routes": path.join(cwd, baseRoot + "routes"),
    "trd": path.join(cwd, baseRoot + "trd"),
  }
}
//服务端产出路径
if(process.env.NODE_ENV==='prod') {//生产环境
  options.publicPath = '/project1-front';
}else if(process.env.NODE_ENV==='test') {//测试环境
  //options.publicPath = '/icop-sampleapp-frontend';
}else{//本地开发环境
}

//构建webpack配置
module.exports = config.webpack(options);