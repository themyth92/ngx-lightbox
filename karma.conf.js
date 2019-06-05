const path = require('path');
const webpack = require('webpack');

module.exports = config => {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
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
      require('karma-jasmine'),
      require('karma-phantomjs-launcher'),
      require('karma-webpack'),
      require('karma-sourcemap-loader'),
      require('@angular-devkit/build-angular/plugins/karma')
    ],
    preprocessors: {
      './karma-main.js': ['webpack', 'sourcemap']
    },
    webpack: {
      mode: 'development',
      stats: 'errors-only',
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
