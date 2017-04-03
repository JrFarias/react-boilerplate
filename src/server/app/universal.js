import React from 'react';
import { renderToString } from 'react-dom/server';
import { match } from 'react-router';
import { Provider } from 'react-redux';
import { createBrowserHistory } from 'history';
import { AppContainer } from 'react-hot-loader'; //eslint-disable-line
import App from '../../client/app/App';
import createRoutes from '../../client/app/routes';
import configureStore from '../../client/app';

const path = require('path');
const fs = require('fs');

const routes = createRoutes({});
const history = createBrowserHistory();

module.exports = function universalLoader(req, res) {
  // res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'))
  const filePath = path.resolve(__dirname, '..', 'client', 'index.html');

  fs.readFile(filePath, 'utf8', (err, htmlData) => { //eslint-disable-line
    if (err) {
      console.error('read err', err); // eslint-disable-line no-console
      return res.status(404).end();
    }
    match({ routes, location: req.url }, (erro, redirect, renderProps) => { //eslint-disable-line
      if (erro) {
        console.error('match err', err);  // eslint-disable-line no-console
        return res.status(404).end();
      } else if (redirect) {
        res.redirect(302, redirect.pathname + redirect.search);
      } else if (renderProps) {
        const store = configureStore;
        const ReactApp = renderToString(
          <AppContainer>
            <Provider store={store}>
              <App history={history} />
            </Provider>
          </AppContainer>
        );
        const RenderedApp = htmlData.replace('{{Loading...}}', ReactApp);
        res.send(RenderedApp);
      } else {
        return res.status(404).end();
      }
    });
  });
};

