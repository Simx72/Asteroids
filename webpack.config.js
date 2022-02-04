const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

module.exports = (env) => ({
    entry: './src/main.ts',
    devtool: (env.production) ? 'inline-source-map' : undefined,
    resolve: {
        extensions: ['.ts', '.js', '.tsx'],
    },
    module: {
        rules: [ // add modules
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                use: [
                    env.production ? MiniCssExtractPlugin.loader : 'style-loader',
                    'css-loader'
                ],
            },
            {
                test: /\.(png|svg|jpe?g|gif)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.(mp4|wav)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource',
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Asteroids' + ((env.production) ? '' : ' - development mode'),
            filename: 'index.html',
            favicon: "./src/assets/favicon.ico"
        }),
    ].concat(env.production ? [new MiniCssExtractPlugin()] : []),
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
    },
    mode: (env.production) ? 'production' : 'development',
});