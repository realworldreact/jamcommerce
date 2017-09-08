import {
  createTypes,
  handleActions,
  combineReducers,
} from 'berkeleys-redux-utils';
import { createAction } from 'redux-actions';

import navReducer from '../Nav/redux';
import productReducer from '../Product/redux';

const ns = 'app';

const defaultState = { location: {} };
export const types = createTypes([ 'routeUpdated' ], ns);

export const routeUpdated = createAction(types.routeUpdated);

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
);
