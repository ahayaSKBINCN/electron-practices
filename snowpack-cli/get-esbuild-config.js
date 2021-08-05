const path = require('path');
const {promisify} = require('util');
const glob = require('glob');

const config = require("./config");
const isDev = require("./isDev");

const MODE_ARRAY = ["NODE_ENV", "MODE"];


module.exports = async (more) => {
    // define an empty obj;
    const define = {};
    // define an mapper;
    const mapEnvToDefine = function (key) {
        define[`process.env.${key}`] = JSON.stringify(process.env[key]);
    };
    // first MODE_ARRAY mapping;
    MODE_ARRAY.forEach(mapEnvToDefine);
    // second env mapping;
    Object.keys(process.env).forEach(mapEnvToDefine);
    // default log level;
    let logLevel = "warning";

    if (process.env.QUIET) {
        logLevel = 'silent';
    } else if (process.env.VERBOSE) {
        logLevel = 'info';
    }

    return {
        platform: 'node',
        format: 'cjs', // common js;
        entryPoints: await promisify(glob)('src/main/@(index|preload).[jt]s'),
        outdir: path.join(config.outputDir, "main"),
        bundle: true,
        external: ['electron','realm'],
        define,
        logLevel,
        ...(isDev ? {} : { minify: true }),
        ...more,
    };
}
