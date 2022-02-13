const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = function(paramEnv) {

    const env = Object.assign(process.env, paramEnv)

    env.production == env.production || process.env.NODE_ENV == 'production';

    // console.log(env)

    return {
        entry: './src/core.ts',
        devtool: (env.production) ? undefined : 'inline-source-map',
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
                    test: /\.html$/i,
                    use: 'html-loader',
                },
                {
                    test: /\.(png|svg|jpe?g|gif)$/i,
                    type: 'asset/resource',
                },
                {
                    test: /\.(mp4|mp3|wav|ogg)$/i,
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
                favicon: "./src/assets/favicon.ico",
                minify: "auto",
                hash: env.production == true,
                template: 'src/template.html'
            }),
            new webpack.DefinePlugin({
                process: {
                    env: {
                        NODE_ENV: env.production ? `"production"` : '"development"'
                    }
                }
            })
        ].concat(env.production ? [new MiniCssExtractPlugin()] : []),
        output: {
            filename: 'bundle.js',
            path: path.resolve(__dirname, 'dist'),
            clean: true,
        },
        mode: (env.production) ? 'production' : 'development',
    };
};