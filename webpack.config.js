const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path')
module.exports = options => ({
  entry: {
    main: './src/main.ts',
    // polyfills: "./src/polyfills.ts",
  }, resolve: {
    modules: ['src', 'node_modules'],

    extensions: ['.ts', '.js', '.json', '.png']
  },
  output: {
    filename: '[name].js',
    path: path.join(__dirname, 'src', 'dist'),
  },
  optimization:{
    minimize: false, // <---- disables uglify.
    // minimizer: [new UglifyJsPlugin()] if you want to customize it.
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: ['ts-loader', 'angular2-template-loader'],
        exclude: /node_modules/
      },
      // {
      //   test: /\.exec\.js$/,
      //   use: [ 'script-loader' ]
      // },
      {
        test: /\.html$/,
        use: 'html-loader'
      },
      {
        test: /\.(css|scss)$/,
        loaders: ['to-string-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.(jpg|png|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              // Inline files smaller than 10 kB
              limit: 10 * 1024,
            },
          },
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                enabled: false,
                // NOTE: mozjpeg is disabled as it causes errors in some Linux environments
                // Try enabling it in your environment by switching the config to:
                // enabled: true,
                // progressive: true,
              },
              gifsicle: {
                interlaced: false,
              },
              optipng: {
                optimizationLevel: 7,
              },
              pngquant: {
                quality: '65-90',
                speed: 4,
              },
            },
          },
        ],
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      }
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