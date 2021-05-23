const { loadConfiguration } = require('snowpack');
const isDev = require("./isDev");

module.exports = async () => {
    return loadConfiguration(isDev ? { devOptions: { hmr: true } } : {});
};
