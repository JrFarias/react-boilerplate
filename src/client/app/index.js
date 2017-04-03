import { AppContainer } from 'react-hot-loader'; //eslint-disable-line
import { applyMiddleware, compose, createStore } from 'redux';
import { createBrowserHistory } from 'history';
import { routerMiddleware, connectRouter } from 'connected-react-router/immutable';
import { Provider } from 'react-redux';
import Immutable from 'immutable';
import React from 'react';
import ReactDOM from 'react-dom';
import multi from 'redux-multi';
import thunk from 'redux-thunk';
import App from './App';
import rootReducer from './reducers';

const history = createBrowserHistory();

const initialState = Immutable.Map();
//eslint-disable-next-line
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  connectRouter(history)(rootReducer),
  initialState,
  composeEnhancer(
    applyMiddleware(
      routerMiddleware(history),
    ),
  ),
  multi,
  thunk
);

const render = () => {
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <App history={history} />
      </Provider>
    </AppContainer>,
    document.getElementById('root')
  );
};
  //eslint-disable-next-line
  window.__STORE__ = store;

render();

// Hot reloading
if (module.hot) {
  // Reload components
  module.hot.accept('./App', () => {
    render();
  });

  // Reload reducers
  module.hot.accept('./reducers', () => {
    store.replaceReducer(connectRouter(history)(rootReducer));
  });
}
