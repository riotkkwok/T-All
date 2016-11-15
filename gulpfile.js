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

gulp.task('all', function(done){
    new Promise(function(resolve){
        runWebpack();
        resolve();
    }).then();
    // runSequence('webpack', 'rev', done);
});

gulp.task('watch', function(){
    gulp.watch(['./src/static/**/*.*'], 'all');
});