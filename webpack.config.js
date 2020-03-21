'use strict';

const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
    entry: {
        base: path.resolve(__dirname, '_src', 'base.js'),
        home: path.resolve(__dirname, '_src', 'home.js'),
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
            },
            {
                test: /bootstrap\.native/,
                use: {
                    loader: 'bootstrap.native-loader',
                    options: {
                      ignore: ['alert', 'modal', 'popover', 'scrollspy', 'tab', 'toast', 'tooltip']
                    }
                },
            },
            {
                test: /\.(scss)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                    'sass-loader',
                ],
            },
            {
                // apply rule for images
                test: /\.(png|jpe?g|gif|webp)$/,
                use: [
                    {
                        // Using file-loader for these files
                        loader: 'file-loader',

                        options: {
                            name: '[name].[ext]',
                            outputPath: 'img',
                        },
                    },
                ],
            },
            {
                test: /\.(woff|woff2|ttf|otf|eot|svg)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'fonts',
                        },
                    },
                ],
            },
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].[hash].min.css',
        }),
        new CopyWebpackPlugin([
            {
                from: path.resolve(__dirname, '_src', 'img'),
                to: path.resolve(__dirname, 'assets', 'img'),
                toType: 'dir',
            },
            {
                from: path.resolve(__dirname, '_src', 'favicons'),
                to: path.resolve(__dirname, 'assets', 'favicons'),
                toType: 'dir',
            },
            {
                from: path.resolve(__dirname, '_src', 'js', 'g-analytics.js'),
                to: path.resolve(__dirname, 'assets'),
                toType: 'dir',
            },
        ]),
        new HtmlWebpackPlugin(
            {
                filename: path.resolve(__dirname, '_layouts', 'default.html'),
                template: path.resolve(__dirname, '_src/template', 'default.html'),
                chunks: ['base'],
            },
        ),
    ],
    optimization: {
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    parse: {
                        // We want terser to parse ecma 8 code. However, we don't want it
                        // to apply any minification steps that turns valid ecma 5 code
                        // into invalid ecma 5 code. This is why the 'compress' and 'output'
                        // sections only apply transformations that are ecma 5 safe
                        // https://github.com/facebook/create-react-app/pull/4234
                        ecma: 8,
                    },
                    compress: {
                        ecma: 5,
                        warnings: false,
                        // Disabled because of an issue with Uglify breaking seemingly valid code:
                        // https://github.com/facebook/create-react-app/issues/2376
                        // Pending further investigation:
                        // https://github.com/mishoo/UglifyJS2/issues/2011
                        comparisons: false,
                        // Disabled because of an issue with Terser breaking valid code:
                        // https://github.com/facebook/create-react-app/issues/5250
                        // Pending further investigation:
                        // https://github.com/terser-js/terser/issues/120
                        inline: 2,
                    },
                    mangle: {
                        safari10: true,
                    },
                    output: {
                        ecma: 5,
                        comments: false,
                        // Turned on because emoji and regex is not minified properly using default
                        // https://github.com/facebook/create-react-app/issues/2488
                        ascii_only: true, /* eslint-disable-line camelcase */
                        comments: false,
                    },
                },
                // Use multi-process parallel running to improve the build speed
                // Default number of concurrent runs: os.cpus().length - 1
                parallel: true,
                // Disable file caching
                cache: false,
                extractComments: false,
            }),
            new OptimizeCSSAssetsPlugin({}),
        ],
    },
    output: {
        filename: '[name].[hash].min.js',
        path: path.resolve(__dirname, 'assets/'),
        publicPath: '/assets/',
    },
    devtool: false,
    devServer: {
        contentBase: [
            path.resolve(__dirname, '_site/'),
        ],
        watchContentBase: true,
        hot: false,
        liveReload: true, // hot must be disabled, watchContentBase must be enabled
        writeToDisk: true,
        watchOptions: {
            aggregateTimeout: 1000,
            poll: true,
            ignored: ['.git/**', '.jekyll-cache/**', 'node_modules/**'],
        },
    },
};
