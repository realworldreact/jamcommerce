import {
  combineActions,
  createAction,
  createAsyncTypes,
  createTypes,
  handleActions,
  composeReducers,
} from 'berkeleys-redux-utils';

import { addRedirectTo } from '../../redux';
import {
  fullNameSelector as topFullNameSelector,
  emailSelector as topEmailSelector,
} from '../../Auth/redux';
import accountEpic from './account-epic';

export const ns = 'Account';
export const epics = [accountEpic];

export const types = createTypes(
  [
    'didMountWithoutAuth',
    'willUnmount',
    'showEditProfile',
    'cancelEditProfile',
    'submitEditProfile',
    'editProfileSuccess',
    'showChangePassword',
  ],
  ns,
);

const getNS = state => state[ns];
export const showingEditProfileSelector = state =>
  getNS(state).showingEditProfile;
export const showingChangePasswordSelector = state =>
  getNS(state).showingChangePassword;
export const fullNameSelector = state =>
  showingEditProfileSelector(state)
    ? `${state.forms.profile.firstname} ${state.forms.profile.lastname}`
    : topFullNameSelector(state);
export const emailSelector = state =>
  showingEditProfileSelector(state)
    ? state.forms.profile.email
    : topEmailSelector(state);

export const didMountWithoutAuth = createAction(
  types.didMountWithoutAuth,
  undefined,
  addRedirectTo,
);
export const willUnmount = createAction(types.willUnmount);
export const showEditProfile = createAction(types.showEditProfile);
export const cancelEditProfile = createAction(types.cancelEditProfile);
export const submitEditProfile = createAction(types.submitEditProfile);
export const showChangePassword = createAction(types.showChangePassword);
export const editProfileSuccess = createAction(types.editProfileSuccess);

const defaultState = {
  showingEditProfile: false,
  showingChangePassword: false,
};

export const formModels = {
  profile: {
    firstname: '',
    lastname: '',
    email: '',
  },
};

export default composeReducers(
  ns,
  handleActions(
    () => ({
      [types.willUnmount]: state => ({
        ...state,
      }),
      [types.showEditProfile]: state => ({
        ...state,
        showingEditProfile: true,
        showingChangePassword: false,
      }),
      [combineActions(
        types.cancelEditProfile,
        types.editProfileSuccess,
      )]: state => ({
        ...state,
        showingEditProfile: false,
      }),
      [types.showChangePassword]: state => ({
        ...state,
        showingEditProfile: false,
        showingChangePassword: true,
      }),
    }),
    defaultState,
  ),
);
