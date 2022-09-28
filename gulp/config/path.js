const pathSrc = "./src";
const pathDest = "./dist";

export default {
    root: pathDest,
    html: {
        src: `${pathSrc}/pages/*.html`,
        watch: `${pathSrc}/pages/**/*.html`,
        dest: pathDest,
    },
    css: {
        src: `${pathSrc}/styles/*.css`,
        watch: `${pathSrc}/styles/**/*.css`,
        dest: `${pathDest}/styles`,
    },
    scss: {
        src: `${pathSrc}/sass/*.scss`,
        watch: `${pathSrc}/sass/**/*.scss`,
        dest: `${pathDest}/styles`,
    },
    js: {
        src: `${pathSrc}/scripts/*.js`,
        watch: `${pathSrc}/scripts/**/*.js`,
        dest: `${pathDest}/scripts`,
    },
    img: {
        src: `${pathSrc}/images/*.{png,jpg,jpeg,gif,svg}`,
        watch: `${pathSrc}/images/**/*.{png,jpg,jpeg,gif,svg}`,
        dest: `${pathDest}/images`,
    },
    font: {
        src: `${pathSrc}/fonts/*.{eot,ttf,otf,otc,ttc,woff,woff2,svg}`,
        watch: `${pathSrc}/fonts/**/*.{eot,ttf,otf,otc,ttc,woff,woff2,svg}`,
        dest: `${pathDest}/fonts`,
    },
};
