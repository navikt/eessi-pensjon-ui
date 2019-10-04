const path = require('path')

module.exports = {
  mode: 'production',
  entry: './src/dist.js',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'dist.js',
    library: 'eessi-pensjon-ui',
    libraryTarget: 'umd',
    publicPath: '/dist/',
    umdNamedDefine: true
  },
  module: {
    rules: [{
      test: /\.less$/,
      use: ['style-loader', 'css-loader', 'less-loader']
    }, {
      test: /\.css$/,
      use: ['style-loader', 'css-loader']
    }, {
      test: /\.svg$/,
      use: [{
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env'],
          plugins: [
            '@babel/transform-react-jsx',
            '@babel/plugin-proposal-class-properties',
            '@babel/plugin-proposal-export-namespace-from'
          ]
        }
      }, {
        loader: 'react-svg-loader',
        options: {
          jsx: false // true outputs JSX tags
        }
      }]
    }, {
      test: /\.(png|jpe?g|gif)$/i,
      use: [{
        loader: 'url-loader',
        options: {
          fallback: 'file-loader',
          name: '[name][md5:hash].[ext]',
          outputPath: 'dist/',
          publicPath: '/dist/'
        }
      }]
    }, {
      test: /\.js$/,
      include: path.resolve(__dirname, 'src'),
      exclude: /(node_modules|bower_components|build)/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env'],
          plugins: [
            '@babel/transform-react-jsx',
            '@babel/plugin-proposal-class-properties',
            '@babel/plugin-proposal-export-namespace-from'
          ]
        }
      }
    }]
  },
  resolve: {
    alias: {
      react: path.resolve(__dirname, './node_modules/react'),
      'react-dom': path.resolve(__dirname, './node_modules/react-dom'),
      assets: path.resolve(__dirname, 'assets')
    }
  },
  externals: {
    // Don't bundle react or react-dom
    react: {
      commonjs: 'react',
      commonjs2: 'react',
      amd: 'React',
      root: 'React'
    },
    'react-dom': {
      commonjs: 'react-dom',
      commonjs2: 'react-dom',
      amd: 'ReactDOM',
      root: 'ReactDOM'
    }
  }
}
