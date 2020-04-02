// Webpack is used only to compile example

module.exports = {
     entry: `${__dirname}/public/index.js`,
     output: {
         filename: 'bundle.js',
         path: `${__dirname}/public`,
     },
     module: {
         loaders: [
           {
             test: /\.jsx?$/,
             exclude: /node_modules/,
             loaders: ['react-hot-loader', 'babel-loader'],
           },
           {
            test: /\.s*css$/,
            loader: "style-loader!css-loader"
          }
         ]
     },
     devServer: {
        contentBase: './public',
        host: 'localhost'
      }
 }
