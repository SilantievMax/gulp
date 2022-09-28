const isProd = process.argv.includes("--production");
const isDev = !isProd;

export default {
    isProd: isProd,
    isDev: isDev,
    htmlmin: {
        collapseWhitespace: isProd,
    },
    webpack: {
        mode: isProd ? "    " : "development",
    },
    imagemin: {
        verbose: true,
    },
    fonter: {
        formats: ["ttf", "woff", "eot", "svg"],
    },
};
