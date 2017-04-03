import { AppContainer } from 'react-hot-loader'; //eslint-disable-line
import { applyMiddleware, compose, createStore } from 'redux';//eslint-disable-line
import { createBrowserHistory } from 'history';//eslint-disable-line
import { routerMiddleware, connectRouter } from 'connected-react-router/immutable';//eslint-disable-line
import { Provider } from 'react-redux';//eslint-disable-line
import Immutable from 'immutable';//eslint-disable-line
import React from 'react';
import ReactDOM from 'react-dom';
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

render();

// Hot reloading
if (module.hot) {
  // Reload components
  module.hot.accept('./App', () => {
    render();
  });

  // Reload reducers
  module.hot.accept('./reducers', () => {
    store.replaceReducer(connectRouter(history)(rootReducer))
  });
}
