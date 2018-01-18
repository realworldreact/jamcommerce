import {
  combineActions,
  createAction,
  createAsyncTypes,
  createTypes,
  handleActions,
} from 'berkeleys-redux-utils';

import { addRedirectTo } from '../../redux';

export const ns = 'Account';

export const types = createTypes(
  [
    'didMountWithoutAuth',
    'willUnmount',
    'showEditProfile',
    'showChangePassword',
  ],
  ns,
);

const getNS = state => state[ns];
export const showingEditProfileSelector = state =>
  getNS(state).showingEditProfile;
export const showingChangePasswordSelector = state =>
  getNS(state).showingChangePassword;

export const didMountWithoutAuth = createAction(
  types.didMountWithoutAuth,
  undefined,
  addRedirectTo,
);
export const willUnmount = createAction(types.willUnmount);
export const showEditProfile = createAction(types.showEditProfile);
export const showChangePassword = createAction(types.showChangePassword);

const defaultState = {
  showingEditProfile: false,
  showingChangePassword: false,
};

export default handleActions(
  () => ({
    [types.willUnmount]: state => ({
      ...state,
    }),
    [types.showEditProfile]: state => ({
      ...state,
      showingEditProfile: true,
      showingChangePassword: false,
    }),
    [types.showChangePassword]: state => ({
      ...state,
      showingEditProfile: false,
      showingChangePassword: true,
    }),
  }),
  defaultState,
  ns,
);
