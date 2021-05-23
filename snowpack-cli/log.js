const chalk = require('chalk');
const CHALK_CONFIG = {
    info: "dim",
    warn: "yellow",
    error: "red"
};

const {name} = require('../package.json');
let measurement = 0;
const measurements = {};

const log = function log(fn, level) {
    return function inner(message, options = {}) {
        const verbose = options.verbose || false;
        const label = options.label || name;
        const {measure} = options;

        let output;
        let elapsed = -1;
        if (measure === true) {
            measurement += 1;
            output = measurement;
            measurements[measurement] = Date.now();
        } else if (typeof measure === "number" && measurements[measure] !== null) {
            elapsed = Date.now() - measurements[measure];
        }
        if (process.env.QUITE || verbose && !process.env.VERBOSE) return output;
        fn(`${
            chalk[CHALK_CONFIG[level]](`[${label}]`)
        } ${message}${elapsed >= 0 ?
            chalk.dim(` [${(elapsed / 1000).toFixed(2)}s]`) :
            ""
        }`);
        return output;
    }
}

module.exports = {
    info: log(console.log, "info"),
    warn: log(console.warn, "warn"),
    error: log(console.error, "error"),
    stringify: (obj, multiline) =>
        chalk.cyanBright(JSON.stringify(obj, ...(multiline ? [null, 2] : []))),
};
