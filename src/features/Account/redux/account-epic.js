import { navigateTo } from 'gatsby-link';
import { combineEpics } from 'redux-observable';
import { map } from 'rxjs/operator/map';
import { ignoreElements } from 'rxjs/operator/ignoreElements';
import { EmptyObservable } from 'rxjs/observable/EmptyObservable';

import { ns, types, editProfileSuccess } from './';

export function storeProfileEpic(actions, { getState }, { localStorage }) {
  if (!localStorage) {
    return EmptyObservable.create();
  }
  const userNS = `Auth.user`;
  return actions.ofType(types.submitEditProfile)::map(
    ({ payload }) => payload,
  )::map(user => {
    localStorage.setItem(userNS, JSON.stringify(user));
    return editProfileSuccess();
  });
}

export default combineEpics(storeProfileEpic);
