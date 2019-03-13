//const path = require('path');
const webpack = require('webpack');

module.exports = {
  //context: path.resolve(__dirname, 'src'),
  entry: './src/index.js',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
			loader: 'babel-loader',
			options: {
				presets: ['@babel/preset-env'],
			}
		}
	  },
	  {
		test: /\.css$/,
		use: ['style-loader','css-loader']
	  },
	  {
		 test: /\.(png|svg|jpg|gif)$/,
		 exclude: /node_modules/,
         use: ['file-loader']
      }
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  output: {
    path: __dirname + '/dist',
    publicPath: '/',
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    contentBase: './dist',
    hot: true
  }
};