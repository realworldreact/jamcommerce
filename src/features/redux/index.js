import {
  createTypes,
  handleActions,
  combineReducers,
} from 'berkeleys-redux-utils';
import { createAction } from 'redux-actions';

import cartEpic from './cart-epic.js';
import errorEpic from './error-epic.js';
import cartReducer from '../Cart/redux';
import productReducer, { epics as productEpics } from '../Product/redux';
import navReducer from '../Nav/redux';

const ns = 'app';

const defaultState = { location: {} };
export const epics = [
  cartEpic,
  errorEpic,
  ...productEpics,
];
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

export default combineReducers(
  handleActions(
    () => ({
      [types.routeUpdated]: (state, { payload: location }) => ({
        location,
      }),
    }),
    defaultState,
    ns,
  ),
  navReducer,
  productReducer,
  cartReducer,
);
