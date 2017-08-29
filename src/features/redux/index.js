import { createTypes } from 'redux-create-types';
import { createAction } from 'redux-actions';

import { createReducerHash, handleActions } from '../../utils/redux.js';
import navReducer from '../Nav/redux';

const ns = 'app';

const defaultState = { location: {} };
export const types = createTypes([ 'routeUpdated' ], ns);

export const routeUpdated = createAction(types.routeUpdated);

export default function createReducer() {
  return createReducerHash(
    handleActions(
      types,
      types => ({
        [types.routeUpdated]: (state, { payload: location }) => ({
          location,
        }),
      }),
      defaultState,
      ns,
    ),
    navReducer,
  );
}
