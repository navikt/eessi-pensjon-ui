const { merge } = require('webpack-merge')
const common = require('./webpack.common.ts')

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist'
  }
})
