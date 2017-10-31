import { navigateTo } from 'gatsby-link';
import { combineEpics } from 'redux-observable';
import { map } from 'rxjs/operator/map';
import { ignoreElements } from 'rxjs/operator/ignoreElements';
import { EmptyObservable } from 'rxjs/observable/EmptyObservable';

import {
  ns,
  types,
  userParseError,
  userLoginSuccess,
  userLoginFailed,
} from './';
import { redirectToSelector } from '../../redux';

// poor mans auth
// replace with auth service in production
export function signupEpic(actions, { getState }, { localStorage }) {
  if (!localStorage) {
    return EmptyObservable.create();
  }
  const userNS = `${ns}.user`;
  return actions.ofType(types.onSignupSubmit)::map(
    ({ payload }) => payload,
  )::map(user => {
    localStorage.setItem(userNS, JSON.stringify(user));
    const redirectTo = redirectToSelector(getState());
    navigateTo(redirectTo || '/account');
  })::ignoreElements();
}

export function signinEpic(actions, { getState }, { localStorage }) {
  if (!localStorage) {
    return EmptyObservable.create();
  }
  const userNS = `${ns}.user`;
  return actions.ofType(types.onSigninSubmit)::map(
    ({ payload }) => payload,
  )::map(_user => {
    console.log(`
      This example app uses local Storage for auth. In production an
      authentication service should be used.
    `);
    let user = localStorage.getItem(userNS);
    if (user) {
      try {
        user = JSON.parse(user);
      } catch (error) {
        return userParseError(error);
      }
      if (user.password === _user.password && user.email === _user.email) {
        const redirectTo = redirectToSelector(getState());
        navigateTo(redirectTo || '/account');
        return userLoginSuccess(user);
      }
      return userLoginFailed('User email or password is incorrect');
    }
    return userLoginFailed('No user found');
  });
}

export default combineEpics(signinEpic, signupEpic);
