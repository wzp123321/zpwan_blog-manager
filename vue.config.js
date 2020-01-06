const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const webpack = require('webpack')
const env = process.env.NODE_ENV

const getRoot = (env) => {
  let root = ''
  switch (env) {
    case 'production':
      root = '/blogManage/'
      break
    case 'development':
      root = '/'
      break
    case 'reprod':
      root = '/'
      break
  }
  return root
}

const moduleConfig = {
  publicPath: getRoot(env),
  configureWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      return {
        plugins: [
          new BundleAnalyzerPlugin(),
          new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
        ]
      }
    }
  }
}
module.exports = moduleConfig
