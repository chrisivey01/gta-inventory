const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path')
module.exports = options => ({
  entry: {
    main: './src/main.ts'
  }, resolve: {
    extensions: ['.ts', '.js']
  },
  output: {
    filename: 'main.js',
    path: path.join(__dirname, 'src', 'dist'),
  },
  module: {
    rules: [{
      test: /\.ts$/,
      use: ['ts-loader', 'angular2-template-loader']
    },
    {
      test: /\.html$/,
      use: 'html-loader'
    },
    {
      test: /\.(css|scss)$/,
      loaders: [
        'to-string-loader', 'style-loader', 'css-loader',
      ],
    },
    ]
  },
  // devServer: {
  //   writeToDisk: true
  // },
  plugins: options.plugins.concat([
    // Always expose NODE_ENV to webpack, in order to use `process.env.NODE_ENV`
    // inside your code for any environment checks; Terser will automatically
    // drop any unreachable code.
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
  ]),
});

// const htmlWebpackPlugin = new HtmlWebpackPlugin({
//   template: './src/index.html',
// });

// webpackConfig.plugins = [
//   htmlWebpackPlugin,
// ];
// module.exports = webpackConfig;