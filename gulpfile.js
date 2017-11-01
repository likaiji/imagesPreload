"use strict";
var gulp = require("gulp"),
    gulp_sourcemaps = require("gulp-sourcemaps"),
    autoprefixer = require("gulp-autoprefixer"),//增加私有变量前缀
    fs = require("fs"),
    webpackStream = require("webpack-stream"),
    webpack = require("webpack"),
    path = require("path"),
    glob = require("glob"),
    md5 = require("gulp-md5-plus"),
    gulpif = require("gulp-if"),//if判断，用来区别生产环境还是开发环境的
    replace = require("gulp-replace"),
    sass = require("gulp-sass"),
    imagemin = require("gulp-imagemin"),
    clean = require("gulp-clean"),//清理文件
    AssetsPlugin = require("assets-webpack-plugin"),
    assetsPluginInstance = new AssetsPlugin({filename: "assets.json", path: path.join(__dirname, "dist")}),
    replaceAssets = require("gulp-replace-assets");

const DEBUG = process.argv[2] !== "build"

gulp.task("dev", () => {
    gulp.start("sass");
    gulp.start("watch");
})

const cssSrc = ['./**/*.scss', '!./node_modules/**/*.scss', '!/About/HandBooks/*.scss'];

gulp.task("watch", function () {
    gulp.watch(cssSrc, ["sass"]);
});

gulp.task("sass", () => {
    return gulp.src(cssSrc)
    // .pipe(cache('sass'))
        .pipe(gulp_sourcemaps.init()) //如果debug则生成sourcemap
        .pipe(sass({outputStyle: "compressed"}))
        .pipe(autoprefixer({browserslist: ["iOS9", "Android >= 4.4"]}))
        .pipe(gulp_sourcemaps.write("")) //如果debug则生成sourcemap
        .pipe(gulp.dest(""))
});