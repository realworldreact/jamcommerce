import _ from 'lodash';
import {
  combineActions,
  createAction,
  createAsyncTypes,
  createTypes,
  handleActions,
} from 'berkeleys-redux-utils';

import { addRedirectTo } from '../../redux';

export const ns = 'account';

export const types = createTypes(['didMountWithoutAuth', 'willUnmount'], ns);

export const didMountWithoutAuth = createAction(
  types.didMountWithoutAuth,
  undefined,
  addRedirectTo,
);
export const willUnmount = createAction(types.willUnmount);

const defaultState = {};

export default handleActions(
  () => ({
    [types.willUnmount]: state => ({
      ...state,
    }),
  }),
  defaultState,
  ns,
);
