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
    'cancelEdit',
    'submitEditProfile',
    'editProfileSuccess',
    'showChangePassword',
    'submitChangePassword',
    'changePasswordSuccess',
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
export const cancelEdit = createAction(types.cancelEdit);
export const submitEditProfile = createAction(types.submitEditProfile);
export const showChangePassword = createAction(types.showChangePassword);
export const editProfileSuccess = createAction(types.editProfileSuccess);
export const changePasswordSuccess = createAction(types.changePasswordSuccess);
export const submitChangePassword = createAction(types.submitChangePassword);

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
  changepassword: {
    currentpass: '',
    newpass: '',
    confirmpass: '',
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
        types.cancelEdit,
        types.editProfileSuccess,
        types.changePasswordSuccess,
      )]: state => ({
        ...state,
        showingEditProfile: false,
        showingChangePassword: false,
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
