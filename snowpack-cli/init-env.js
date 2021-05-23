/* eslint-disable global-require */
const {logger} = require("snowpack");
const fs = require("fs");
const config = require("./config");
const isDev =require("./isDev");

if (process.env.QUITE) {
    logger.level = "silent";
} else {
    logger.level = "debug";
}

const {NODE_ENV} = process.env;



process.env.MODE = NODE_ENV;
process.env.SNOWPACK_PUBLIC_BASE_HREF = config.baseHref;
process.env.SNOWPACK_PUBLIC_RENDERER_BASE_HREF = config.rendererBaseHref;
if (isDev) {
    process.env.SNOWPACK_PORT = config.snowpackPort;
}

/**
 * base on:
 * https://github.com/snowpackjs/snowpack/tree/main/plugins/plugin-dotenv
 */

const dotEnvFiles = [
    NODE_ENV && `.env.${NODE_ENV}.local`,
    NODE_ENV !== 'test' && '.env.local',
    NODE_ENV && `.env.${NODE_ENV}`,
    ".env"
].filter(Boolean);

dotEnvFiles.forEach((dotEnvFile)=>{
    if(fs.existsSync(dotEnvFile)){
        require("dotenv-expand")(
            require("dotenv").config({
                path: dotEnvFile,
            })
        )
    }
})
