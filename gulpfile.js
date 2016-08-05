var gulp = require('gulp'),
    less = require('gulp-less'),
    mini = require('gulp-minify-css'),
    concat = require("gulp-concat"),
    rename = require('gulp-rename'),
    clean = require('gulp-clean'),
    connect = require('gulp-connect');

gulp.task('default',['clean','connect', 'watch'],function() {
    gulp.run("develop");//运行develop任务
});
gulp.task('develop', function() {
    //执行开发级别的任务
    gulp.run("build-less","concat");
    gulp.watch("less/*.less",["build-less"]);
    gulp.watch("css/*.css",["concat"]);
});
gulp.task('release', function() {
    //执行发布级别的任务
});
/*gulp 编译less*/
gulp.task('build-less', function () {
     gulp.src('less/*.less')
        .pipe(less())
        .pipe(gulp.dest('css'));
});
/*压缩合并css*/
gulp.task('concat',['build-less'], function () {
    gulp.src('css/*.css')
        .pipe(concat('ytm.min.css'))
        .pipe(mini())
        .pipe(gulp.dest('api')) ;
});
/*清空*/
gulp.task('clean', function() {
    return gulp.src(['api/css/ytm.min.css'], {read: false})
        .pipe(clean({force: true}));
});
//创建watch任务去检测html文件,其定义了当html改动之后，去调用一个Gulp的Task
gulp.task('watch', function () {
    gulp.watch(['html/*.html'], ['html']);
});
gulp.task('connect', function () {
    connect.server({
        root: './',
        port:8888,
        livereload: true
    });
});
gulp.task('html', function () {
    gulp.src('html/html/*.html')
        .pipe(connect.reload());
});