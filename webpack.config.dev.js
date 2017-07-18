const webpack = require('webpack');

module.exports = {

    entry: [
        './src/common/index.tsx'
    ],

    output: {
        filename: 'bundle.js',
        path: '/',
        publicPath: 'http://localhost:8080/'
    },

    externals: undefined,

    devtool: 'source-map',

    module: {
        rules: [
            {
                test: /\.ts|\.tsx/,
                use: ['react-hot-loader/webpack', 'awesome-typescript-loader'],
                exclude: /node_modules/
            },
            {test: /\.css/, use: ['style-loader', 'css-loader']},
            {
                test: /\.scss$/, use: [
                {
                    loader: 'style-loader'
                },
                {
                    loader: 'css-loader', options: {sourceMap: true}
                },
                {
                    loader: 'sass-loader', options: {sourceMap: true}
                }]
            },
            {test: /\.jpe?g$|\.gif$|\.png$|\.ico$/, use: ['file-loader?name=[name].[ext]']},
            {test: /\.eot|\.ttf|\.svg|\.woff2?/, use: ['file-loader?name=[name].[ext]']}
        ]
    },

    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('development'),
                APP_ENV: JSON.stringify('browser')
            }
        })
    ],

    resolve: {
        extensions: ['.js', '.jsx', '.json', '.ts', '.tsx']
    },

    devServer: {
        port: 8080,
        headers: {
            'Access-Control-Allow-Origin': '*'
        }
    }

};
