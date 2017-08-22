import React from 'react';
import { Provider } from 'react-redux';
import { renderToString } from 'react-dom/server';

import storeFactory from './src/features/storeFactory.js';

exports.replaceRenderer = ({ bodyComponent, replaceBodyHTMLString }) => {

  const store = storeFactory();

  const ConnectedBody = () => (
    <Provider store={ store }>
      { bodyComponent }
    </Provider>
  );
  replaceBodyHTMLString(renderToString(<ConnectedBody />));
};
