import { createTypes } from 'berkeleys-redux-utils';
import { createAction } from 'redux-actions';

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
