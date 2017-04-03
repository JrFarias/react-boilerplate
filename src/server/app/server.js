const path = require('path');
const webpack = require('webpack'); //eslint-disable-line
const webpackDevMiddleware = require('webpack-dev-middleware');//eslint-disable-line
const webpackHotMiddleware = require('webpack-hot-middleware');//eslint-disable-line
const express = require('express');//eslint-disable-line
const config = require('../../../webpack.config.dev');

const app = express();
const compiler = webpack(config);

app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath,
  historyApiFallback: true,
}));

app.use(webpackHotMiddleware(compiler));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../client/app/index.html'));
});

app.listen(3000, (err) => {
  if (err) {
    return console.error(err); // eslint-disable-line no-console
  }
  console.log('Listening at http://localhost:3000'); // eslint-disable-line no-console
  return null;
});
