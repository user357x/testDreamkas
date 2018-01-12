const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const extractStyles = new ExtractTextPlugin({
    filename: 'main.css',
    allChunks: true
});

module.exports = {

    entry: './frontend/index.jsx',

    output: {
        path: path.resolve(__dirname, 'public/assets'),
        filename: 'main.js',
    },

    module: {
        rules: [

            {
                test: /\.(js|jsx)$/,
                exclude: [/node_modules/],
                use: [
                    { loader: 'babel-loader' }
                ]
            },

            {
                test: /\.(sass|css|scss)$/,
                exclude: /node_modules/,
                loader: extractStyles.extract({
                    use: [{
                        loader: 'css-loader',
                        options: {
                            sourceMap: true,
                        },
                    }, {
                        loader: 'postcss-loader',
                    }, {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true,
                            outputStyle: 'expanded',
                        },
                    }],
                    fallback: 'style-loader',
                }),
            }

        ]
    },

    plugins: [
        extractStyles
    ]

};