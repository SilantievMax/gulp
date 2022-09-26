import gulp from "gulp";
import { deleteSync } from "del";
import browserSync from "browser-sync";

//Плагины
import plumber from "gulp-plumber";
import notify from "gulp-notify";
import fileInclude from "gulp-file-include";
import htmlmin from "gulp-htmlmin";
import size from "gulp-size";
import concat from "gulp-concat";
import cssimport from "gulp-cssimport";
import autoprefixer from "gulp-autoprefixer";
import csso from "gulp-csso";
import rename from "gulp-rename";
import shorthand from "gulp-shorthand";
import gulpGroupCssMediaQueries from "gulp-group-css-media-queries";
import dartSass from "sass";
import gulpSass from "gulp-sass";
import sassGlob from "gulp-sass-glob";
import babel from "gulp-babel";
import uglify from "gulp-uglify";
import webpack from "webpack-stream";
import imagemin from "gulp-imagemin";
import newer from "gulp-newer";
import webp from "gulp-webp";
import webpHtml from "gulp-webp-html";
import webpCss from "gulp-webp-css";
import fonter from "gulp-fonter";
import ttf2woff2 from "gulp-ttf2woff2";
import gulpif from "gulp-if";

//Переменные
const { src, dest, watch, series, parallel } = gulp;
const sass = gulpSass(dartSass);

//Конфигурация
import path from "./gulp/config/path.js";
import app from "./gulp/config/app.js";

//Обработка HTML
export const html = (cd) => {
    src(path.html.src)
        .pipe(plumber()) //{errorHandler: notify.onError((error) => ({title: "HTML",message: error.message,}))} обработка ошибок
        .pipe(fileInclude())
        .pipe(webpHtml())
        .pipe(size({ title: "index.html" }))
        .pipe(htmlmin(app.htmlmin))
        .pipe(size({ title: "index.min.html" }))
        .pipe(dest(path.html.dest));
    cd();
};

//Обработка CSS
export const css = (cd) => {
    src(path.css.src, { sourcemaps: app.isDev })
        .pipe(plumber()) //{errorHandler: notify.onError((error) => ({title: "CSS",message: error.message,}))} обработка ошибок
        .pipe(concat("main.css"))
        .pipe(cssimport())
        .pipe(webpCss())
        .pipe(autoprefixer())
        .pipe(shorthand())
        .pipe(gulpGroupCssMediaQueries())
        .pipe(size({ title: "main.css" }))
        .pipe(dest(path.css.dest, { sourcemaps: app.isDev }))
        .pipe(rename({ suffix: ".min" }))
        .pipe(csso())
        .pipe(size({ title: "main.min.css" }))
        .pipe(dest(path.css.dest, { sourcemaps: app.isDev }));
    cd();
};

//Обработка SCSS
export const scss = (cd) => {
    src(path.scss.src, { sourcemaps: app.isDev })
        .pipe(plumber()) //{errorHandler: notify.onError((error) => ({title: "CSS",message: error.message,}))} обработка ошибок
        .pipe(sassGlob())
        .pipe(sass())
        .pipe(webpCss())
        .pipe(autoprefixer())
        .pipe(shorthand())
        .pipe(gulpGroupCssMediaQueries())
        .pipe(size({ title: "main.css" }))
        .pipe(dest(path.scss.dest, { sourcemaps: app.isDev }))
        .pipe(rename({ suffix: ".min" }))
        .pipe(csso())
        .pipe(size({ title: "main.min.css" }))
        .pipe(dest(path.scss.dest, { sourcemaps: app.isDev }));
    cd();
};

//Обработка JS
export const js = (cd) => {
    src(path.js.src, { sourcemaps: app.isDev })
        .pipe(plumber()) //{errorHandler: notify.onError((error) => ({title: "JS",message: error.message,}))} обработка ошибок
        .pipe(babel())
        .pipe(webpack(app.webpack)) //development or production
        .pipe(dest(path.js.dest, { sourcemaps: app.isDev }));
    cd();
};

//Обработка Images
export const img = (cd) => {
    src(path.img.src)
        .pipe(plumber()) //{errorHandler: notify.onError((error) => ({title: "img",message: error.message,}))} обработка ошибок
        .pipe(newer(path.img.dest))
        .pipe(webp())
        .pipe(dest(path.img.dest))
        .pipe(src(path.img.src))
        .pipe(newer(path.img.dest))
        .pipe(gulpif(app.isProd, imagemin(app.imagemin)))
        .pipe(dest(path.img.dest));
    cd();
};

//Обработка fonts
export const font = (cd) => {
    src(path.font.src)
        .pipe(plumber()) //{errorHandler: notify.onError((error) => ({title: "font",message: error.message,}))} обработка ошибок
        .pipe(newer(path.font.dest))
        .pipe(fonter(app.fonter))
        .pipe(dest(path.font.dest))
        .pipe(ttf2woff2())
        .pipe(dest(path.font.dest));
    cd();
};

//Удаление директории
export const clear = (cd) => {
    deleteSync(path.root);
    cd();
};

//Сервер
export const server = () => {
    browserSync.init({
        server: {
            baseDir: path.root,
        },
    });
};

//Наблюдение за файлами
export const watcher = () => {
    watch(path.html.watch, html).on("all", browserSync.reload);
    watch(path.css.watch, css).on("all", browserSync.reload);
    watch(path.scss.watch, scss).on("all", browserSync.reload);
    watch(path.js.watch, js).on("all", browserSync.reload);
    watch(path.img.watch, img).on("all", browserSync.reload);
    watch(path.font.watch, font).on("all", browserSync.reload);
};

//Сборка
export const build = series(
    clear,
    parallel(html, scss, js, img, font) //css or scss
);

export const dev = series(build, parallel(watcher, server));

export default app.isProd ? build : dev