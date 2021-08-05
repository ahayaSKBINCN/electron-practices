const path = require("path");
const chalk = require("chalk");
const execa = require('execa');
const {build: esBuild} = require('esbuild');
const {startServer: startSnowpackServer} = require('snowpack');
const RouteService = require("../route");

const config = require("../config");
const log = require("../log");

const getESBuildConfig = require('../get-esbuild-config');
const getSnowpackConfig = require('../get-snowpack-config');


const getMain = function () {
    let electron, esbuild;
    const kill = function () {
        if (electron && !electron.killed) electron.kill();
        if (esbuild) esbuild.rebuild.dispose();
    }
    const dev = async function (electronArgs) {
        let restarting = false;
        const startElectron = async function () {
            const args = [path.join(config.outputDir, "main/index.js"), ...electronArgs];
            log.info(
                `Starting an ${chalk.bold('electron')} process with arguments: ${log.stringify(args)}`,
                {verbose: true}
            );
            electron = execa('electron', args);
            electron.stdout.on("data", function (message) {
                log.info(message, {label: 'electron'});
            });
            electron.stderr.on("data", function (message) {
                log.error(message, {label: 'electron'});
            });
            electron.on("close", function () {
                if (restarting) {
                    // restart
                    startElectron()
                    restarting = false;
                } else {
                    // close the process;
                    process.exit(0);
                }
            })
            electron.on("error", function () {
                process.exit(0);
            })
        }
        const startESBuild = async function () {
            const cfg = await getESBuildConfig({
                watch: {
                    onRebuild(error) {
                        if (error) {
                            log.error(`watch build failed:\n${log.stringify(error)}`, {label: 'esbuild'});
                        } else {
                            restarting = true;
                            if (electron) electron.kill();
                        }
                    },
                },
            });
            log.info(
                `Starting ${chalk.bold('esbuild')} build with config: ${log.stringify(cfg, true)}`,
                {verbose: true}
            );
            esbuild = await esBuild(cfg);
        }
        await startESBuild();
        await startElectron();
    };

    return {
        kill,
        dev,
    };
};

const getRenderer = function () {
    let snowpack;
    const kill = async function () {
        if (snowpack) await snowpack.shutdown();
    };
    const dev = async function () {
        const cfg = await getSnowpackConfig();
        log.info(
            `Starting ${chalk.bold('Snowpack')} server with config: ${log.stringify(cfg, true)}`,
            {verbose: true}
        );
        const server = new RouteService.Builder().build();
        server.startWork();
        snowpack = await startSnowpackServer({config: cfg});
        snowpack.onFileChange(server.onFileChange);
    };
    return {
        kill,
        dev,
    };
}

module.exports = async function (electronArgs) {
    const main = getMain();
    const renderer = getRenderer();

    // onExit(async function (code) {
    //     // fix the error does not
    //     if(process.env.NODE_ENV === "production"){
    //         if (code === 1) {
    //             log.error('🚨 An unexpected error has occurred!');
    //         } else {
    //             log.info('🔌 Shutting down gracefully...');
    //         }
    //         try {
    //             await Promise.all([main.kill(), renderer.kill()])
    //         } finally {
    //             process.exit(code);
    //         }
    //     }
    // });
    try {
        await renderer.dev();
    } catch (err) {
        log.error(err, {label: "snowpack-dev-renderer-error"});
        process.exit(1);
    }
    try {
        await main.dev(electronArgs);
    } catch (err) {
        log.error(err, {label: "snowpack-dev-main-error"});
        process.exit(1);
    }
};
