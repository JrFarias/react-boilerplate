import React, { PropTypes } from 'react';
import { ConnectedRouter } from 'connected-react-router/immutable';
import routes from './routes';

const App = ({ history }) => (
  <ConnectedRouter history={history}>
    { routes }
  </ConnectedRouter>
  );

App.propTypes = {
  history: PropTypes.object, //eslint-disable-line
};

export default App;
