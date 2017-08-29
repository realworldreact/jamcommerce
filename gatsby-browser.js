import React from 'react';
import PropTypes from 'prop-types';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';

import { routeUpdated } from './src/features/redux';
import storeFactory from './src/storeFactory.js';

exports.replaceRouterComponent = ({ history }) => {
  const win = typeof window !== 'undefined' ? window : {};
  // const doc = win.document ? win.document : {};
  const devTools = win.__REDUX_DEVTOOLS_EXTENSION__ ?
    win.__REDUX_DEVTOOLS_EXTENSION__() :
    f => f;

  const store = storeFactory({
    enhancer: devTools,
  });

  store.dispatch(routeUpdated(history.location));
  history.listen(location => store.dispatch(routeUpdated(location)));

  const ConnectedRouterWrapper = ({ children }) =>
    (
      <Provider store={ store }>
        <Router history={ history }>
          { children }
        </Router>
      </Provider>
    );

  ConnectedRouterWrapper.propTypes = { children: PropTypes.any };

  return ConnectedRouterWrapper;
};
