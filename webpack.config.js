const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {

    entry: './frontend/app.js',

    output: {
        path: path.resolve(__dirname, 'assets'),
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
                test: /\.css$/,
                exclude: [/node_modules/],
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader"
                })
            }

        ]
    },

    plugins: [
        new ExtractTextPlugin("main.css"),
    ]

};