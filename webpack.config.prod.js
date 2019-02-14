const webpack = require('webpack');
const fs = require('fs');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    context: path.join(__dirname, './front'),
    entry: {
        kernel: ['kernel'],
    },
    output: {
        path: path.join(__dirname, './public/built'),
        publicPath: '/built/',
        filename: '[hash].[name].js',
        chunkFilename: '[chunkhash].[name].js',
    },
    module: {
        loaders: [
            {
                test: /\.(html|gif|png|jpg|jpeg|ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
                loader: 'file-loader',
                query: { name: '[name].[ext]' },
            },
            {
                test: /\.scss$/,
                loaders: ExtractTextPlugin.extract({
                    fallbackLoader: 'style-loader',
                    loader: 'css-loader!sass-loader',
                }),
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loaders: [
                    {
                        loader: 'babel-loader',
                        query: { cacheDirectory: true },
                    },
                ],
            },
        ],
    },
    resolve: {
        extensions: ['.js'],
        modules: [
            path.resolve('./front'),
            'node_modules',
        ],
        alias: {
            react: path.resolve(__dirname, 'node_modules/react'),
            'react-dom': path.resolve(__dirname, 'node_modules/react-dom'),
        },
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': { NODE_ENV: JSON.stringify('production') },
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: { warnings: false },
            output: { comments: false },
            sourceMap: true,
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: true,
            debug: false,
        }),
        new ExtractTextPlugin({
            filename: '[hash].app.css',
            allChunks: true,
        }),

        function symfonyAssetsVersion() {
            this.plugin('done', (stats) => {
                fs.writeFile(
                    path.join(__dirname, 'config/packages', 'assets_version.yaml'),
                    `parameters:\n    assets_hash: ${stats.hash}\n`
                );
            });
        },
    ],
};
