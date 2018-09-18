const path = require('path');
const webpack = require("webpack")

let conf = {};
try {
    conf = JSON.stringify(require("./config/default"));
} catch (e) {
    console.log(e);
    conf = {};
}


module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    resolve: {
        alias: {
            Images: path.resolve(__dirname, 'img/'),
            Components: path.resolve(__dirname, 'src/components/'),
            Data: path.resolve(__dirname, 'data/'),
        }
    },
    devServer: {
        contentBase: './dist',
        port: 3000,
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /.*\.(zip|gif|png|jpe?g)$/i,
                use: [
                    {loader: 'file-loader'}
                ]
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({CONFIG: conf})
    ]
}
