import { createTypes, handleActions } from 'berkeleys-redux-utils';
import { createAction } from 'redux-actions';

import cartEpic from './cart-epic.js';
import errorEpic from './error-epic.js';

export const epics = [
  cartEpic,
  errorEpic,
];

const ns = 'app';

const defaultState = { location: {} };
export const types = createTypes(
  [
    'addToCart',
    'appMounted',
    'routeUpdated',
  ],
  ns,
);

export const appMounted = createAction(types.appMounted);
export const routeUpdated = createAction(types.routeUpdated);
export const addToCart = createAction(types.addToCart);

export default handleActions(
  () => ({
    [types.routeUpdated]: (state, { payload: location }) => ({
      location,
    }),
  }),
  defaultState,
  ns,
);
