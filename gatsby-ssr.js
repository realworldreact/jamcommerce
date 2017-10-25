import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';

import storeFactory from './src/storeFactory.js';

exports.replaceRenderer = ({
  setHeadComponents,
  bodyComponent,
  replaceBodyHTMLString,
}) => {
  setHeadComponents([ <script
    key={ 'stripe-elements' }
    src='https://js.stripe.com/v3/'
  /> ]);
  const store = storeFactory();

  const ConnectedBody = () =>
    (
      <Provider store={ store }>
        { bodyComponent }
      </Provider>
    );

  replaceBodyHTMLString(renderToString(<ConnectedBody />));
};
