var path = require('path');
var webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
/*
module.exports = {
  entry: './src/index.js',
  output: { 
      path: __dirname + '/public', filename: 'bundle.js' 
    },
  mode: 'development',
  module: {
    rules: [
        { 
            test: /\.css$/, use: ['style-loader', 'css-loader'], 
            include: /flexboxgrid/
            //Follow instructions at https://github.com/roylee0704/react-flexbox-grid
        },
        {
            test: /\.js|.jsx?$/,
            exclude: /(node_modules)/,
            loaders: ["babel-loader"]
        }
    ]
  },
};
*/

// Constant with your paths

const paths = {
    // Put your structure paths here
    DIST: path.resolve(__dirname,'dist'),
    SRC: path.resolve(__dirname, 'src'),
    JS: path.resolve(__dirname,'src'),
    PUBLIC: path.resolve(__dirname, 'public'),
};
    
    // Webpack configuration
    // Change your entry point here
    
module.exports = {
    entry: path.join(paths.JS, 'index.js'),
    output: {
        path: paths.DIST,
        filename: 'bundle.js',
    },
    
    // Tell webpack to use html plugin
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(paths.PUBLIC, 'index.html'),
        }),
        new ExtractTextPlugin('style.bundle.css'), 
    ],
    
    // Loaders configuration
    // We are telling webpack to use ‘babel-loader’ for .js and .jsx // files
    
    module: {
    
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader'],
            },{
                test: /\.css$/,
                loader: ExtractTextPlugin.extract({
                    use: 'css-loader',
                    }),
            },{
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract({ 
                    use: ['css-loader', 'sass-loader'],
                }),
            },{
                test: /\.(png|jpg|gif)$/,
                use: ['file-loader'],
            },
        ],
    },
    resolve: {
        extensions: ['.js', '.jsx'],
    },
};

    /*
module.exports = {
  entry: './src/index.js',
  output: { 
      path: __dirname + '/public', filename: 'bundle.js' 
    },
  mode: 'development',
  module: {
    rules: [
        { 
            test: /\.css$/, use: ['style-loader', 'css-loader'], 
            include: /flexboxgrid/
            //Follow instructions at https://github.com/roylee0704/react-flexbox-grid
        },
        {
            test: /\.js|.jsx?$/,
            exclude: /(node_modules)/,
            loaders: ["babel-loader"]
        }
    ]
  },
};
*/