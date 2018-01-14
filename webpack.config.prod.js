const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {

    entry: [
        './src/common/index.tsx'
    ],

    output: {
        filename: 'bundle-prod.js',
        path: path.resolve(__dirname, 'dist/public'),
        publicPath: '/'
    },

    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.css', '.scss', '.json']
    },

    module: {
        rules: [
            {
                test: /\.ts(x?)/,
                use: {
                    loader: 'awesome-typescript-loader',
                    options: {
                        configFileName: "tsconfig.prod.json"
                    },
                },
                exclude: /node_modules/,
            },
            {
                test: /\.css/, use: ExtractTextPlugin.extract({
                    use: [
                        {loader: "css-loader", options: {minimize: true}}]
                })
            },
            {
                test: /\.scss/,
                use: ExtractTextPlugin.extract({
                    use: [
                        {loader: "css-loader", options: {minimize: true}},
                        {loader: "sass-loader"},
                    ]
                }),
            },
            {test: /\.jpe?g$|\.gif$|\.png$|\.ico$/, use: 'file-loader?name=[name].[ext]'},
            {test: /\.eot|\.ttf|\.svg|\.woff2?/, use: 'file-loader?name=[name].[ext]'}
        ]
    },

    plugins: [
        new ExtractTextPlugin("bundle.css"),
        new UglifyJsPlugin(),
    ]
};