/**
 * Created by Administrator on 2016/4/25.
 */
 var URL_HOME = '/'; //主页的链接
//**********编译生产环境**********
if (process.env.YYLIB_ENV == 'prod') {
    //// 后端服务地址
    //var ADDR = "http://127.0.0.1:9002";
    //// 后端服务项目名
    //var ROOT_PATH = '/icop-d-web';
    //// 参照注册服务地址
    //var REF_SERVER_URL = "http://123.56.19.206:8088";
    //// Portal首页地址
    //var URL_HOME_PORTAL = "http://60.205.12.0:81/icop-workbench/#workindex";
    //var URL_WORKBENCH = "http://60.205.12.0:81/icop-workbench/getWorkbenchCookie";
} else
//**********编译测试环境***********
if(process.env.YYLIB_ENV == 'test') {
    //// 后端服务地址
    //var ADDR = "http://127.0.0.1:9002";
    //// 后端服务项目名
    //var ROOT_PATH = '/icop-d-web';
    //// 参照注册服务地址
    //var REF_SERVER_URL = "http://123.56.19.206:8088";
    //// Portal首页地址
    //var URL_HOME_PORTAL = "http://60.205.12.0:81/icop-workbench/#workindex";
    //var URL_WORKBENCH = "http://60.205.12.0:81/icop-workbench/getWorkbenchCookie";
} else
//*********本地开发环境************
{
    // 后端服务地址
    var ADDR = "http://60.205.12.0:81";
    // var ADDR = "http://127.0.0.1:8080";
    // 后端服务项目名
    var ROOT_PATH = '/icop-front-web';
    // 参照注册服务地址
    var REF_SERVER_URL = "http://60.205.12.0:81";
    // Portal首页地址
    var URL_HOME_PORTAL = "http://60.205.12.0:81/icop-workbench/#workindex";
    var URL_WORKBENCH = "http://60.205.12.0:81/icop-workbench/getWorkbenchCookie";
}

// 单据类型（示例）
var MODULE_URL = {
    SAMPLE: ADDR + ROOT_PATH + "/sample"
};

module.exports = {
    URL_HOME,
    URL_HOME_PORTAL,
    REF_SERVER_URL,
    MODULE_URL
};
