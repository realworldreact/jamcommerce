import {
  createTypes,
  handleActions,
  composeReducers,
} from 'berkeleys-redux-utils';
import { createAction } from 'redux-actions';

import cartEpic from './cart-epic.js';
import errorEpic from './error-epic.js';

export const epics = [cartEpic, errorEpic];

const ns = 'app';

export const addRedirectTo = () => ({ redirectTo: true });
export const isRedirectAction = ({ meta: { redirectTo } = {} }) => !!redirectTo;

export const types = createTypes(
  ['addToCart', 'appMounted', 'routeUpdated'],
  ns,
);

export const appMounted = createAction(types.appMounted);
export const routeUpdated = createAction(types.routeUpdated);
export const addToCart = createAction(types.addToCart);

const defaultState = {
  location: {},
  redirectTo: '/',
};

const getNS = state => state[ns];
export const redirectToSelector = state => getNS(state).redirectTo;

export default composeReducers(
  ns,
  handleActions(
    () => ({
      [types.routeUpdated]: (state, { payload: location }) => ({
        ...state,
        location,
      }),
    }),
    defaultState,
  ),
  function redirectToReducer(state = defaultState, action) {
    if (isRedirectAction(action)) {
      const currentLocation = location.pathname || '/';
      return {
        ...state,
        redirectTo:
          currentLocation !== '/signin' && currentLocation !== '/signup'
            ? currentLocation
            : state.redirectTo,
      };
    }
    return state;
  },
);
