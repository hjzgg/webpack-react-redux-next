/**
 * Created by Dio on 2016/4/12.
 */

//获取服务器根路径
var _getWebRoot = function(){
    var curWwwPath = window.document.location.href;
    var pathName = window.document.location.pathname;
    var pos = curWwwPath.indexOf(pathName);
    var localhostPaht = curWwwPath.substring(0, pos);
    var projectName = pathName
        .substring(0, pathName.substr(1).indexOf('/') + 1);
    var contPath = localhostPaht + projectName;
    return contPath;
};
/**
 * Css动态加载器
 * @src 文件相对路径
 * @onloadCss 加载完成后的回调
 * @basePath 项目路径
 */
export function loadCSS(src,onloadCss,basePath){
    window.location.toString().substring(0,1)
    if(!src||src.length==0)return;
    var link = document.createElement('link');
    if(basePath&&basePath.length>0){
        link.href = basePath+src;
    }else{
        link.href = src;
    }
    link.rel = 'stylesheet';
    if(onloadCss)link.onload = onloadCss;
    document.head.appendChild(link);
}
/**
 * Js动态加载器
 * @src 文件相对路径
 * @onloadCss 加载完成后的回调
 * @basePath 项目路径
 */
export function loadJS(src,onloadScript,basePath){
    if(!src||src.length==0)return;
    var script = document.createElement('script');
    script.src = src;
    if(basePath&&basePath.length>0){
        script.src = basePath+src;
    }else{
        script.src = src;
    }
    script.type = 'text/javascript';
    if(onloadScript)script.onload = onloadScript;
    document.head.appendChild(script);
}

/**
 * 加载多个脚步文件
 * @param srcs {array}
 * @param onloaded {function} 当最后一个脚步文件加载完成后触发
 * @param basePath
 */
export function loadScripts(srcs,onloaded,basePath) {
    if(srcs){
        if(srcs.length>1){//存在多个文件时一个个加载
            var src = srcs.shift();
            loadJS(src,function(){
                loadScripts(srcs,onloaded,basePath);
            },basePath);
        }else if(srcs.length==1){//当加载最后一个文件时
            var src = srcs.shift();
            loadJS(src,onloaded,basePath);
        }
    }
}
/**
 * 加载多个样式文件
 * @param srcs {array}
 * @param onloaded {function} 当最后一个样式文件加载完成后触发
 * @param basePath
 */
export function loadStyles(srcs,onloaded,basePath) {
    if(srcs){
        if(srcs.length>1){//存在多个文件时一个个加载
            var src = srcs.shift();
            loadCSS(src,function(){
                loadStyles(srcs,onloaded,basePath);
            },basePath);
        }else if(srcs.length==1){//当加载最后一个文件时
            var src = srcs.shift();
            loadCSS(src,onloaded,basePath);
        }
    }
}