const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {

    entry: [
        'babel-polyfill',
        './src/client/index.js'
    ],

    output: {
        filename: 'bundle.js',
        path: './dist/',
        publicPath: '/'
    },

    externals: undefined,

    devtool: 'source-map',

    resolve: {
        extensions: ['.js', '.jsx', '.json']
    },

    module: {
        loaders: [
            { test: /\.js|\.jsx/, use: ['babel-loader'], exclude: /node_modules/ },
            // Css
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract({
                    fallbackLoader: "style-loader",
                    loader: "css-loader"
                })
            },
            // Sass
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract({
                    fallbackLoader: 'style-loader',
                    loader: [
                        { loader: 'css-loader', query: { sourceMap: true } },
                        { loader: 'sass-loader', query: { outputStyle: 'compressed' } }
                    ]
                })
            },
            { test: /\.jpe?g$|\.gif$|\.png$|\.ico$/, use: ['file-loader?name=[name].[ext]'] },
            { test: /\.eot|\.ttf|\.svg|\.woff2?/, use: ['file-loader?name=[name].[ext]'] }
        ]
    },

    plugins: [
        new ExtractTextPlugin({
            filename: '[name].css',
            allChunks: true
        }),
        new webpack.DefinePlugin({
            'process.env': {
                APP_ENV: JSON.stringify('browser')
            }
        })
    ]

};
