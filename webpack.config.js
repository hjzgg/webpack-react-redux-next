var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');
var cwd = process.cwd();
/**
 * 运行配置的公共方法
 */
module.exports={
    //初始化运行时打印
    initPrint:function(filename,printMsg){
        console.log('------------启动运行：'+(process.env.NODE_ENV?'发布态('+process.env.NODE_ENV+')':'开发态')+'------------');
        console.log(path.basename(filename));
        if((typeof printMsg)=='function'){
            printMsg.call();
        }
        console.log('----------------------------------------');
    }
    //,_getExtractTextPlugin:function(styleFileName){
    //    if(!this._extractTextPlugin){
    //        this._extractTextPlugin = new ExtractTextPlugin(styleFileName||"/build/styles.css")
    //    }
    //    return this._extractTextPlugin;
    //}
    //默认插件集合
    ,getDefaultPlugins:function(options){
        var key = options.key||'';
        var rootPath = options.rootPath||'';
        var plugins = [];
        //if(process.env.NODE_ENV==='prod'){//发布模式
        plugins.push(new webpack.DefinePlugin({'process.env.NODE_ENV':'"production"'}));
        plugins.push(new webpack.DefinePlugin({'process.env': {
            NODE_ENV: JSON.stringify(process.env.NODE_ENV)
        }}));
        //}else{}//开发模式
        //打包成一个style样式
        plugins.push(new ExtractTextPlugin(options.styleFileName||"/build/[name].css"));
        //plugins.push(this._getExtractTextPlugin(options.styleFileName));

        plugins.push( new webpack.optimize.DedupePlugin());
        //使用dll动态库打包
        plugins.push(new webpack.DllReferencePlugin({
            context: options.manifestContext||rootPath,
            manifest: require(options.manifestPath || path.join(rootPath, '/apps/' + key + '/manifest-vendor.json'))
        }));

        //提取公用模块代码，避免重复打包
        //plugins.push( new webpack.optimize.CommonsChunkPlugin('common', '/build/common.js'));
        plugins.push( new webpack.optimize.CommonsChunkPlugin({
            names: ['lodash','antd','common'],//注意：最后的一个文件，在html中必须第一个加载
            filename: options.commonFileName||"build/[name].js"
        }));

        //提供全局的变量，在模块中使用无需用require引入，key：window全局变量名，value：npm模块名
        //plugins.push(new webpack.ProvidePlugin({
        //    $: "jquery",
        //    jQuery: "jquery"
        //    antd: "antd"
        //}));

        //根据模板动态生成index.html
        // plugins.push(new HtmlWebpackPlugin({
        //     title: '',
        //     template: path.join(__dirname, '/apps/' + key) + '/template/index.html'
        // }));

        //混淆压缩
        //plugins.push(new webpack.optimize.UglifyJsPlugin({
        //    compress: {warnings: false}
        //}));

        return plugins;
    }
    //默认加载器集合
    ,getDefaultLoaders:function(options){
        var imageFileName = options.imageFileName|| '/build/[name].[ext]';
        var fontFileName = options.imageFileName|| '/build/[name].[ext]?[hash]';
        //var extractTextPlugin = this._getExtractTextPlugin(options.styleFileName);
        //var cssLoader = extractTextPlugin.extract("style-loader", "css-loader");
        //var lessLoader = extractTextPlugin.extract("style-loader", "css!less");
        var loaders = [
            // 在这里添加 react-hot，注意这里使用的是loaders，所以不能用 query，应该把presets参数写在 babel 的后面
            {test: /\.js?$/,exclude:/node_modules/,loaders: ['react-hot-loader/webpack','babel?presets[]=react,presets[]=es2015']},
            {test: /\.css$/,loader: ExtractTextPlugin.extract("style-loader","css-loader")}, //"style-loader!css-loader"
            {test: /\.less$/, loader: ExtractTextPlugin.extract("style-loader","css-loader!less-loader")},
            {test: /\.json$/,loader:'json-loader'},
            // {test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192'}, // inline base64 URLs for <=8k images, direct URLs for the rest
            {test: /\.(png|jpg|gif)$/,loader: 'file-loader?name='+imageFileName},
            {test: /\.(ttf\??|eot\??|svg\??|woff\??|woff2\??)/, loader: "file-loader?name="+fontFileName}
        ];
        return loaders;
    }
    //默认别名集合
    ,getDefaultAlias:function(alias,nodeModulesPath){
        var _defaultAlias = Object.assign({
            "antd":(process.env.NODE_ENV==='prod') ? path.join(nodeModulesPath,'/antd/dist/antd.min.js') : path.join(nodeModulesPath,'/antd/dist/antd.js')
        },alias||{});
        //console.log('-------------自定义路径别名-------------');
        //for(var key in _defaultAlias){
        //    console.log('['+key+']'+_defaultAlias[key]+']');
        //}
        //console.log('----------------------------------------');
        return _defaultAlias;
    }
    //默认的外部依赖不需要打包进bundle，直接在html页面通过script标签引入,key：npm模块名，value：window全局变量名
    ,getDefaultExternals:function(externals){
        var _default = Object.assign({
            "jquery": "jQuery",//var $ = require('jquery');编译后为：var $ = window.jQuery;
            "echarts":"echarts"
            //,'react':'React'//var React = require('react');编译后为：var React = window.React;
            //,'react-dom':'ReactDOM'//var ReactDOM = require('react-dom');编译后为：var ReactDOM = window.ReactDOM;
            //,"lodash":"_"
        },externals||{});
        return _default;
    }
    //构建webpack配置信息
    ,webpack:function(options) {
        var key = options.key||'';
        var port = options.port||8080;
        var rootPath = options.rootPath||'';
        var nodeModulesPath = options.nodeModulesPath||path.join(rootPath,'/node_modules/');
        var entry = {};
        entry.antd = ['antd'];
        entry.lodash = ['lodash'];
        entry = Object.assign(entry,options.modules||{});
        //扩展devServer配置
        var devServer =  Object.assign({
            port: port
        },options.devServer);
        return {
            devServer: devServer,
            entry: entry,
            output: {
                path: options.path || path.join(rootPath, 'apps/'+key)//编译后的输出路径
                , filename: options.filename || '/build/bundle.js'
                , publicPath: options.publicPath || '/apps/'+key//服务端的路径
                , chunkFilename: "/build/[name]_[hash].chunk.js"
            },
            externals:this.getDefaultExternals(options.externals),
            module: {
                loaders: options.loaders||this.getDefaultLoaders(options)
            },
            resolve: {
                extension: options.extension||['', '.js', '.jsx', '.json']
                ,alias: this.getDefaultAlias(options.alias,nodeModulesPath)
            },
            plugins: options.plugins||this.getDefaultPlugins(options)
        }
    }
    //构建webpack动态dll配置信息
    ,webpackdll:function(options){
        var key = options.key||'build';
        var rootPath = options.rootPath||'';
        var entry = {};
        entry['vendor']=['react','react-dom','react-redux','history','react-router','react-custom-scrollbars','rc-animate','rc-queue-anim','superagent','superagent-jsonp','js-cookie','redux-simple-router'];
        entry = Object.assign(entry,options.modules||{});
        return {
            entry: entry,
            output: {
                path: options.path||path.join(rootPath, 'apps/'+key),//编译后的输出路径
                filename: options.filename ||'[name].dll.js',
                library:options.manifestName||'dll_[name]'
            },
            plugins: options.plugins||[
                new webpack.DefinePlugin({'process.env.NODE_ENV':'"production"'}),
                new webpack.DllPlugin({
                    path: options.manifestPath||'apps/'+key+'/manifest-[name].json',//manifest.json 文件的输出路径，这个文件会用于后续的业务代码打包
                    name: options.manifestName||'dll_[name]',// dll 暴露的对象名，要跟 output.library 保持一致
                    context: options.manifestContext||rootPath,//解析包路径的上下文，这个要跟接下来配置的 webpack.config.js 一致
                }),
                new webpack.DefinePlugin({
                    'process.env': {
                        NODE_ENV: JSON.stringify(process.env.NODE_ENV)
                    }
                })
            ]
        }
    }
}
