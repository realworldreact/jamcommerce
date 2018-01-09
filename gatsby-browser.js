import React from 'react';
import PropTypes from 'prop-types';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { StripeProvider } from 'react-stripe-elements';
import GoCommerce from 'gocommerce-js';
import devTools from 'remote-redux-devtools';

import { routeUpdated } from './src/features/redux';
import storeFactory from './src/storeFactory.js';

exports.replaceRouterComponent = ({ history }) => {
  const win = typeof window !== 'undefined' ? window : {};
  // const doc = win.document ? win.document : {};

  const commerce = new GoCommerce({
    APIUrl: process.env.GOCOMMERCE_URI,
  });
  const store = storeFactory({
    epicDependencies: {
      commerce,
      localStorage: win.localStorage,
    },
    enhancer: devTools({ realtime: !!localStorage.__ENABLE_DEVTOOLS }),
  });

  store.dispatch(routeUpdated(history.location));
  history.listen(location => store.dispatch(routeUpdated(location)));

  const ConnectedRouterWrapper = ({ children }) => {
    const withoutStripe = (
      <Router history={history}>
        {children}
      </Router>
    );
    const withStripe = (
      <StripeProvider apiKey={process.env.STRIPE_API_KEY}>
        {withoutStripe}
      </StripeProvider>
    );

    return (
      <Provider store={store}>
        {window.Stripe ? withStripe : withoutStripe}
      </Provider>
    );
  };

  ConnectedRouterWrapper.propTypes = { children: PropTypes.any };

  return ConnectedRouterWrapper;
};
