import { navigateTo } from 'gatsby-link';
import { combineEpics } from 'redux-observable';
import { map } from 'rxjs/operator/map';
import { ignoreElements } from 'rxjs/operator/ignoreElements';
import { EmptyObservable } from 'rxjs/observable/EmptyObservable';

import { ns, types, editProfileSuccess, changePasswordSuccess } from './';

export function storeProfileEpic(actions, { getState }, { localStorage }) {
  if (!localStorage) {
    return EmptyObservable.create();
  }
  const userNS = `Auth.user`;
  return actions.ofType(types.submitEditProfile)::map(
    ({ payload }) => payload,
  )::map(user => {
    let u = JSON.parse(localStorage.getItem(userNS));
    u = { ...user, password: u.password };
    localStorage.setItem(userNS, JSON.stringify(u));
    return editProfileSuccess();
  });
}

export function storePasswordEpic(actions, { getState }, { localStorage }) {
  if (!localStorage) {
    return EmptyObservable.create();
  }
  const userNS = `Auth.user`;
  return actions.ofType(types.submitChangePassword)::map(
    ({ payload }) => payload,
  )::map(({ newpass }) => {
    let u = JSON.parse(localStorage.getItem(userNS));
    u = { ...u, password: newpass };
    localStorage.setItem(userNS, JSON.stringify(u));
    return changePasswordSuccess();
  });
}

export default combineEpics(storeProfileEpic, storePasswordEpic);
