const path = require('path'),
    ExtractTextPlugin = require("extract-text-webpack-plugin"),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    ManifestPlugin = require('webpack-manifest-plugin'),
    config = require('./config.js');


path.joinFormat = function(){
    const iArgv = Array.prototype.slice.call(arguments);
    const r = path.join.apply(path, iArgv);
    return r
        .replace(/\\+/g, '/')
        .replace(/(^http[s]?:)[\/]+/g, '$1//');
};
path.component = 'src/static/component';
path.lib = 'src/static/js/lib';


module.exports = {
    devServer:{
        host: '127.0.0.1',
        progress: true,
        colors: true,
        contentBase: config.deployserver.root,
        port: 5000,
        hot: true,
        inline: true

    },
    entry: {
        'index': './src/static/js/index.js'
    },
    output: {
        path: path.join(__dirname, config.path.jsDest),
        // publicPath: path.joinFormat(
        //     config.deployserver.path, 
        //     path.relative(
        //         path.join(
        //             config.deployserver.root, 
        //             config.deployserver.path
        //         ), 
        //         config.path.jsDest
        //     ), 
        //     '/'
        // ),
        filename: '[name]-[chunkhash:8].js'
    },
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: '/node_modules/',
            loader: 'babel-loader',
            query: {
                presets: ['es2015']
            }
        }, {
            test: /\.vue$/,
            loaders: ['vue']
        }, {
            test: /\.scss$/,
            loader: ExtractTextPlugin.extract("style-loader", "css!sass")
        }, {
            test: /\.jade$/,
            loaders: ['jade-loader']
        }, {
            test: /\.(png|jpg|gif)$/,
            loader: 'url?limit=10000&name=../images/[name]-[hash:8].[ext]'
        }]

    },
    babel: {
        presets: ['es2015']
    },
    resolveLoader: { 
        fallback: path.join(__dirname, "node_modules") 
    },
    resolve: {
        fallback: path.join(__dirname, "node_modules"),
        root: './',
        alias: {
            'app': path.join(__dirname, path.component, 'app/app.vue'),
            'header': path.join(__dirname, path.component, 'header/header.vue'),
            'details': path.join(__dirname, path.component, 'details/details.vue'),
            'timeTable': path.join(__dirname, path.component, 'timeTable/timeTable.vue'),
            'footer': path.join(__dirname, path.component, 'footer/footer.vue'),
            'loginPanel': path.join(__dirname, path.component, 'loginPanel/loginPanel.vue'),
            'staticInfo': path.join(__dirname, path.component, 'staticInfo/staticInfo.js'),
            'myUtil': path.join(__dirname, path.lib, 'util.js'),
            'viewFilters': path.join(__dirname, path.lib, 'viewFilters.js'),
            'dataFactory': 'src/static/js/data/dataFactory.js',
        },
        publicPath: '/'
    },
    devtool: 'source-map',
    plugins: [
        // 样式分离插件
        new ExtractTextPlugin("../css/index-[chunkhash:8].css"),
        
        // html输出插件
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'src/static/jade/index.jade'),
            filename: '../html/index.html',
            minify: false
        }),
        new ManifestPlugin({
            fileName: '../../../dist/server/assets/rev-manifest.json',
            basePath: ''
        
        })
    ]

};
