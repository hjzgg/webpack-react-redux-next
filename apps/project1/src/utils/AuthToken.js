/**
 * 用户上下文信息
 */
var superagent = require('superagent');
var jsonp = require('superagent-jsonp');
var Cookies = require('js-cookie');
import {WORKBENCHIONCENTERBASEHOST} from 'constants/WorkbenchBaseHost';
var AuthToken = {
    CONTEXT_KEY: 'icop_context'//cookie键
    , SERVER_URL: WORKBENCHIONCENTERBASEHOST + '/icop-workbench/getWorkbenchCookie'//获取上下文的URL
    /**
     * 初始化上下文信息
     * @param options 参数配置{
     *  url:获取上下文的URL
     *  success:初始化上下文成功时的回调
     *  error:初始化上下文失败时的回调
     * }
     */
    , init: function (options) {
        var _url = options&&options.url?options.url:this.SERVER_URL //无URL参数则使用默认获取上下文的URL
        var _success = options&&options.success?options.success:null;
        var _error = options&&options.error?options.error:null;
        var that = this;
        Cookies.remove(this.CONTEXT_KEY);
        superagent.get(_url).use(jsonp).end(function (err, res) {
            if (res != null && res.body != null) {
                console.log('初始化上下文', res.body);
                Cookies.set(that.CONTEXT_KEY, res.body);
                if(typeof _success=='function'){
                    _success();
                }
            }else{
                if(typeof _error=='function'){
                    _error(err);
                }
            }
        });
    }
    /**
     * 获取上下文信息
     * @returns {String}
     */
    , getContext: function () {
        var context = Cookies.get(this.CONTEXT_KEY);
        if (isJsonStr(context)) {//确保为JSON格式的字符串
            var jsTxt = '(' + context.replace(/'/, "\'") + ')';
            var jsonObj = eval(jsTxt);//转换为JSON对象
            return jsonObj;
        }
    },getToken: function () { // 获取Token
        var context = this.getContext();
        if (context == null || context == undefined) {
            return null;
        }
        return context["token"];
    },getUser: function () {
        var context = this.getContext();
        if (context == null || context == undefined) {
            return null;
        }
        return {
            id: context["_A_P_userId"],
            code: context["_A_P_userLoginName"],
            name: context["_A_P_userName"]
        };
    }, getUserId: function () { // 获取用户ID
        var context = this.getContext();
        if (context == null || context == undefined) {
            return null;
        }
        return context["_A_P_userId"];
    }, getUserCode: function () { // 获取用户编码
        var context = this.getContext();
        if (context == null || context == undefined) {
            return null;
        }
        return context["_A_P_userLoginName"];
    }, getUserName: function () { // 获取用户名称
        var context = this.getContext();
        if (context == null || context == undefined) {
            return null;
        }
        return context["_A_P_userName"];
    }, getOrga(){ // 获取组织ID,CODE,NAME信息
        var context = this.getContext();
        if (context == null || context == undefined) {
            return null;
        }
        return {
            id: context["companyId"],
            code: context["companyCode"],
            name: context["companyName"]
        };
    }, getOrgaId: function () { // 获取组织ID
        var context = this.getContext();
        if (context == null || context == undefined) {
            return null;
        }
        return context["companyId"];
    }, getOrgaCode: function () {  // 获取组织编码
        var context = this.getContext();
        if (context == null || context == undefined) {
            return null;
        }
        return context["companyCode"];
    }, getOrgaName: function () { // 获取组织名称
        var context = this.getContext();
        if (context == null || context == undefined) {
            return null;
        }
        return context["companyName"];
    } 
};
/**
 * @desc 是否为JSON对象格式的字符串形态。匹配格式:"{...}"
 */
function isJsonStr(val) {
    return (typeof val == "string" && /^\{.*\}$/.test(val));
}
module.exports = AuthToken;