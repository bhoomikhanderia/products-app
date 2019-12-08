const webpack = require('webpack');
const path = require('path');

module.exports = {
    entry: './src/index.js',
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            {
                test: /\.(png|jp(e*)g|svg)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 8000, // Convert images < 8kb to base64 strings
                        name: 'assets/images/[hash]-[name].[ext]'
                    }
                }]
            },
            {
                test:/\.(s*)css$/,
                use:['style-loader','css-loader', 'sass-loader']
            }
        ]
    },
    resolve: {
        alias: {
            assets: `${path.resolve('./src')}/assets/`,
            actions: `${path.resolve('./src')}/actions/`,
            components: `${path.resolve('./src')}/components/`,
            constants: `${path.resolve('./src')}/constants`,
            containers: `${path.resolve('./src')}/containers/`,
            reducers: `${path.resolve('./src')}/reducers/`,
        },
        extensions: ['*', '.js', '.jsx'],
        modules: [
            path.resolve('./src'), 'node_modules']
    },
    output: {
        path: __dirname + '/dist',
        publicPath: '/',
        filename: 'bundle.js',
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ],
    devServer: {
        contentBase: './dist',
        hot: true
    }
};