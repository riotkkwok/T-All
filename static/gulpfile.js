const gulp = require('gulp'),
    gutil = require('gulp-util'),
    clean = require('gulp-clean'),
    jsonmin = require('gulp-jsonminify'),
    webpack = require('webpack'),
    webpackServer = require('webpack-dev-server'),
    // runSequence = require('run-sequence'),
    es = require('event-stream'),
    fs = require('fs'),
    path = require('path'),
    config = require('./config.js'),
    http = require('http'),
    wpConfig = require('./webpack.config.js');
let server;

function runWebpack(){
    const compiler = webpack(wpConfig, function(err, stats){
        if(err){
          throw new gutil.PluginError('webpack', err);

        }else{
            gutil.log('[webpack]', 'run pass');

        }
        gutil.log('[webpack]', stats.toString());
    });
    // 已使用nginx配置静态资源路径，不需要webpack server
    // if(!server){
    //     wpConfig.entry.index.unshift('webpack-dev-server/client?http://localhost:5000/');
    //     server = new webpackServer(compiler, {
    //         contentBase: 'dist/',
    //         publicPath: ''
    //     });
    //     server.listen(5000);
    // }
}

function copyFiles(){
    const baseUrl = './src/',
        fileList = [path.join(__dirname, baseUrl, 'mock/*.json')];
    gulp.src(fileList)
        .pipe(jsonmin())
        .pipe(gulp.dest(path.join(__dirname, config.path.dest, 'mockApi')));
}

gulp.task('cleanDist', function(){
    if(fs.existsSync(config.path.dest)){
        var exec = require('child_process').exec, child;
        child = exec('rm -rf '+config.path.dest, function(err, out) { 
            console.log(out); 
            err && console.log(err); 
        });
    }
});

gulp.task('all', function(){
    new Promise(function(resolve){
        runWebpack();
        resolve();
    }).then(function(){
        if(config.isDebug){
            copyFiles();
        }
    });
    // runSequence('webpack', 'rev', done);
});

gulp.task('watch', function(){
    gulp.watch(['./src/**/*.*'], ['all']);
});

gulp.task('watchAll', ['all', 'watch']);
