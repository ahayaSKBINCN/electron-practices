const path = require('path');
const builtinModules = require('builtin-modules');
const commonjs = require('@rollup/plugin-commonjs')

const config = require('.');

const dev = process.env.NODE_ENV !== 'production';

const getPathname = (href) => new URL(href, 'http://example.com/').pathname;

/** @type { import("snowpack").SnowpackUserConfig } */
module.exports = {
    mount: {
        public: {url: getPathname(config.baseHref), static: true, resolve: false},
        'src/renderer':  getPathname(config.rendererBaseHref)
    },
    plugins: [
        '@snowpack/plugin-dotenv',
        !dev && path.join(__dirname, '../lib/snowpack-plugin-relative-proxy-imports.js'),
        config.isTS && '@snowpack/plugin-typescript',
    ].filter(Boolean),
    devOptions: {
        output: 'stream',
        open: 'none',
        port: config.snowpackPort,
    },
    buildOptions: {
        out: path.join(config.outputDir, 'renderer'),
    },
    packageOptions: {
        external: [...builtinModules.filter((external) => external !== 'process'),'electron'],
        polyfillNode: true,
        rollup: {
            plugins: [
                commonjs({
                    include: [
                        // packages
                        'fs',
                        'path'
                    ],
                    // the mixing is the problem
                    transformMixedEsModules: true
                })
            ]
        }
    },

};
