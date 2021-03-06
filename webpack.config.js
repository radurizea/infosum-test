const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const path = require('path');

let devTool;
const isDev = process.env.NODE_ENV !== 'production';

const entry = [
  './src/index.tsx',
];
const plugins = [
  new HtmlWebpackPlugin({
    template: './src/index.ejs',
    title: 'Dataset Statistics',
  }),
  new MiniCssExtractPlugin({
    filename: 'styles.[hash].css',
  }),
];
const rules = [
  {
    exclude: /(node_modules)/,
    test: /\.(t|j)sx?$/,
    use: [
      {
        loader: 'ts-loader',
      },
    ],
  },
  {
    exclude: /(nothing)/, // NOTE: To work around TypeScript issue
    test: /\.css$/,
    use: [
      'style-loader',
      {
        loader: MiniCssExtractPlugin.loader,
        options: {
          esModule: false
        }
      },

      'css-loader',
    ],
  },
];

if (isDev) {
  devTool = 'source-map';
  // Source maps are generated by tsc (the TypeScript compiler rather than by Webpack so it
  // is necessary to load them for development purposes...
  rules.push({
    exclude: /(node_modules)/,
    test: /\.js$/,
    use: ['source-map-loader'],
  });
} else {
  plugins.push(new OptimizeCssAssetsPlugin({
    cssProcessorOptions: { discardComments: { removeAll: true } },
  }));
}

module.exports = {
  context: __dirname,
  devServer: {
    contentBase: './',
    historyApiFallback: true,
    https: true,
    port: 3000,
  },
  devtool: devTool,
  entry,
  externals: {
    fs: '{}',
  },
  mode: isDev ? 'development' : 'production',
  module: {
    rules,
  },
  optimization: {
    noEmitOnErrors: true,
  },
  output: {
    filename: 'bundle.[hash].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },
  plugins,
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    modules: [
      path.resolve('./node_modules'),
    ],
  },
  target: 'web',
};
