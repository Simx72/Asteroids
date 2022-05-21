const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = function(paramEnv) {

    const env = Object.assign(process.env, paramEnv)

    env.production = env.production || process.env.NODE_ENV == 'production';

    console.log(env.production);

    // console.log(env)

    let config = {
        entry: {
            core: {
                import: './src/core.ts',
                dependOn: 'phaser'
            },
            phaser: 'phaser'
        },
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
                {
                    test: /\.json$/,
                    type: 'javascript/dynamic', // only for webpack 4+
                    use: [{
                            loader: 'json-import-loader',
                            options: {
                                processPath: path => path,
                            }
                        },
                        { loader: 'json-loader' }
                    ],
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
        ],
        output: {
            filename: '[name].js',
            path: path.resolve(__dirname, 'dist'),
            clean: true,
        }
    };

    if (env.production) { 
        /* production mode */
        Object.assign(config, {
            mode: 'production',
            performance: {
                hints: false,
                maxEntrypointSize: 512000,
                maxAssetSize: 512000
            }
        })
        config.plugins.concat([
            new MiniCssExtractPlugin()
        ])
    } else { 
        /* development mode */
        Object.assign(config, {
            mode: 'development',
            devtool: 'inline-source-map'
        })
    }

    return config;
};