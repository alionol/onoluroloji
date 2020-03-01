'use strict';

const presets = [
    [
        '@babel/preset-env',
        {
            // Allow importing core-js in entrypoint and use browserslist to select polyfills
            useBuiltIns: 'usage',
            // Set the corejs version we are using to avoid warnings in console
            corejs: 3,
            // Do not transform modules to CJS
            modules: false,
            // Exclude transforms that make all code slower
            exclude: ['transform-typeof-symbol'],
        },
    ],
];

module.exports = { presets };
