const { merge } = require('webpack-merge');
const common = require('./webpack.common');

module.exports - merge(common, {
    mode: 'developemnt',
    devtool: 'inline-source-map',
    devServer: {
        static: './dist',
    },
});