const path = require('path');
const webpack = require('webpack');

module.exports = config => {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    files: [
      { pattern: './src/img/*.png', watched: false, included: false, served: true, nocache: false },
      { pattern: './karma-main.js', watched: false }
    ],
    reporters: ['dots'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    browsers: ['PhantomJS'],
    singleRun: true,
    browserConsoleLogOptions: {
      terminal: true,
      level: 'log'
    },
    plugins: [
      'karma-jasmine',
      'karma-phantomjs-launcher',
      'karma-webpack',
      'karma-sourcemap-loader'
    ],
    preprocessors: {
      './karma-main.js': ['webpack', 'sourcemap']
    },
    webpack: {
      resolve: {
        modules: [
          'node_modules'
        ],
        extensions: ['.ts', '.js']
      },
      devtool: 'inline-source-map',
      module: {
        rules: [
          {
            test: /\.ts$/,
            loader: 'awesome-typescript-loader',
            include: [
              path.resolve(__dirname, 'src')
            ]
          }
        ]
      },
      plugins: [
        new webpack.ContextReplacementPlugin(
          /@angular(\\|\/)core(\\|\/)src/,
          path.resolve(__dirname, '../src')
        )
      ]
    },
    webpackServer: {
      noInfo: true
    },
    proxies: {
      '/src/img/': '/base/src/img/'
    }
  });
};
