const gulp = require('gulp'),
    gutil = require('gulp-util'),
    clean = require('gulp-clean'),
    webpack = require('webpack'),
    // runSequence = require('run-sequence'),
    es = require('event-stream'),
    fs = require('fs'),
    path = require('path'),
    config = require('./config.js'),
    http = require('http'),
    wpConfig = require('./webpack.config.js');

function runWebpack(){
    webpack(wpConfig, function(err, stats){
        if(err){
          throw new gutil.PluginError('webpack', err);

        }else{
            gutil.log('[webpack]', 'run pass');

        }
        gutil.log('[webpack]', stats.toString());
    });
}

function copyFiles(){
    const baseUrl = './src/static/',
        fileList = [path.join(__dirname, baseUrl, 'js/api/mock.js')];
    gulp.src(fileList)
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
    gulp.watch(['./src/static/**/*.*'], ['all']);
});

gulp.task('watchAll', ['all', 'watch']);