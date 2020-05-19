// @ts-ignore
const path = require('path')
const CopyPlugin = require('copy-webpack-plugin')

module.exports = {
  entry: {
    index: './src/dist.tsx',
    nav: './src/dist-nav.tsx',
    api: './src/actions/api.ts',
    Dashboard: './src/applications/Dashboard/Dashboard.tsx'
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
    chunkFilename: '[name].js',
    library: 'eessi-pensjon-ui',
    libraryTarget: 'umd',
    publicPath: '/dist/',
    umdNamedDefine: true
  },
  plugins: [
    new CopyPlugin({
      patterns: [{
        from: 'src/index.css',
        to: 'nav.css'
      }, {
        from: 'src/minibootstrap.css',
        to: 'minibootstrap.css'
      }, {
        from: 'src/dist.d.ts',
        to: 'index.d.ts'
      }, {
        from: 'src/actions/api.ts',
        to: 'api.d.ts'
      }, {
        from: 'src/declarations',
        to: 'declarations'
      }]
    })
  ],
  module: {
    rules: [{
      test: /\.less$/,
      use: ['style-loader', 'css-loader', 'less-loader']
    }, {
      test: /\.css$/,
      use: ['style-loader', 'css-loader']
    }, {
      test: /\.svg$/,
      loader: 'svg-url-loader',
      options: { noquotes: true }
    }, {
      test: /\.(png|jpe?g|gif)$/i,
      use: [{
        loader: 'url-loader',
        options:{
          limit: Infinity
        }
      }]
    }, {
      test: /\.js$/,
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
    }, {
      test: /(?<!\.d)\.tsx?$/,
      use: 'ts-loader',
      include: path.resolve(__dirname, 'src')
    }, {
      test: /\.d\.ts$/,
      loader: 'ignore-loader'
    }]
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.jsx', '.js', '.json' ],
    alias: {
      react: path.resolve(__dirname, './node_modules/react'),
      'react-dom': path.resolve(__dirname, './node_modules/react-dom'),
      assets: path.resolve(__dirname, 'assets')
    },
    modules: ['node_modules', './src/']
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
