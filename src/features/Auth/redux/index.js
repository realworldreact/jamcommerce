import {
  createTypes,
  createAction,
  handleActions,
} from 'berkeleys-redux-utils';

import authEpic from './auth-epic.js';

export const ns = 'Auth';

export const epics = [ authEpic ];
export const formModels = {
  user: {
    firstname: '',
    lastname: '',
    email: '',
    password: '',
  },
};

export const types = createTypes(
  [
    'onSignupSubmit',
    'onSigninSubmit',
    'userParseError',
    'userParseSuccess',
    'userLoginFailed',
    'userLoginSuccess',
  ],
  ns,
);

export const onSigninSubmit = createAction(types.onSigninSubmit);
export const onSignupSubmit = createAction(types.onSignupSubmit);
export const userParseError = createAction(types.userParseError);
export const userParseSuccess = createAction(types.userParseSuccess);
export const userLoginFailed = createAction(types.userLoginFailed);
export const userLoginSuccess = createAction(types.userLoginSuccess);

const defaultState = {
  user: null,
};

const getNS = state => state[ns];
export const userSelector = state => getNS(state).user || {};
export const isSignedInSelector = state => !!userSelector(state).firstname;

export const nameSelector = state =>
  isSignedInSelector(state) ? userSelector(state).firstname : '';
export const emailSelector = state =>
  isSignedInSelector(state) ? userSelector(state).email : '';

export default handleActions(
  () => ({
    [types.userLoginSuccess]: (state, { payload: user }) => ({
      ...state,
      user,
    }),
  }),
  defaultState,
  ns,
);
