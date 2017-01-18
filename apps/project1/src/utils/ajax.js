import _ from 'lodash';
var sa = require('superagent');

var _ajax = {
    request:function(options){
        var _defaults = {
            method: 'GET', // 默认请求方法
            type: 'json', // 请求体发送方式 application/json|json|png
            url: '', // 请求url
            cookies:false,//是否携带cookies信息
            send: '',//POST请求参数，即参数不会拼接在URL后面。
            query: '',//GET请求参数，即参数拼接在URL后面。
            // type : '', // 默认content-type，支持text/html|application/x-www-form-urlencoded|application/json|multipart/form-data
            // accept : '', // 默认接受类型application/json|json|text|text/plain
            success:null, // 请求成功的回调函数
            error:null, // 请求失败的回调函数，包括http客户端错误、服务端错误、以及接口调用成功但存在业务错误
            complete:null // 请求完成的回调函数(不管成功还是失败)
        };
        _.assign(_defaults, options);
         
        // 发送ajax请求
        var contentType = 'application/json;charset=UTF-8';
        if (_defaults.type === 'form') {
            contentType = 'application/x-www-form-urlencoded;charset=UTF-8';
        }
        var req = sa(_defaults.method, _defaults.url)
            //.set('Authorization', authorization)
            .set('Content-Type', contentType);
            // .type(defaults.type);
            //设置全局的header信息
            for(var header in this._defaultHeader){
                if(this._defaultHeader[header]!=undefined){
                    req.set(header,this._defaultHeader[header]);
                }
            }
            //存在token则携带全局token到header里面，TODO 临时提供，后期采用动态方式
            // var token = AuthToken.getToken();
            // var authenticationStr = AuthToken.getAuthenticationStr();
            // if(token){
            //     req.set('icop-token', token);
            // }
            // if(authenticationStr){
            //     req.set('authority', authenticationStr);
            // }
            //设置请求携带cookie
            if(_defaults.cookies==true){
              req.withCredentials();
            }
            req.query(_defaults.query)
            .send(_defaults.send)
            .end((err, res) => {
                if (err||(res && res.badRequest)) {
                    if(typeof _defaults.error=='function') {//如果有外部的错误异常处理则使用外部的
                        _defaults.error(res);
                    }else{//如果没有则使用内部默认的异常处理
                        alert('请求异常[状态码:'+err.status+']');
                    }
                }
                if (res && res.ok) {
                    if(res.headers&&res.headers['icop-content-type']){
                        alert(res.text&&res.text.length>0?res.text:res.body);
                        return;
                    }else{
                        if(typeof _defaults.success=='function'){
                            if(_defaults.accept=='text'){
                                _defaults.success(res.text);
                            }else{
                                _defaults.success(res.body);
                            }
                        }
                    }
                }
                if(_defaults.complete){
                    _defaults.complete(res);
                }
            });
    }
}

// 使用superagent封装ajax请求
export function ajax(options) {
    var opts = _.assign({accept:'text'},options,{
        success:function(data){
            if (_.isObject(data)) {
                options.success(data);
            }else{
                options.success(JSON.parse(data));
            }
        }
    });
    _ajax.request(opts);
}
