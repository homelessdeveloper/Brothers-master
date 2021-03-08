const path = require('path');
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const pug = {
    test: /\.pug$/,
    use: ['html-loader?attrs=false', 'pug-html-loader']
};
const scss = {
    test : /\.scss$/,
    use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use     : ['css-loader' , 'sass-loader'],
    })
}

//loaders 

const file = {
    test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
    use: [{
        loader: 'file-loader',
        options: {
            name: '[name].[ext]',
            outputPath: 'fonts/'
        }
    }]
};

module.exports = {
    entry : ['./assets/js/app.js' , './assets/scss/style.scss'] ,
    output : {
        path: path.resolve(__dirname ),
        filename : "main.js"
    },
    module: {
        rules: [pug , scss , file],
    },

    resolve:{
        alias : {
            node_modules : path.resolve(__dirname , 'node_modules/')
        }
    },

    devServer : {
        contentBase : './',
        port        : 34500,
        host: '0.0.0.0',
    },

    plugins: [
        new ExtractTextPlugin('style.css'),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'assets/pug/index.pug',
            inject: false
        }),
    ]
};