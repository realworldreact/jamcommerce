import { combineEpics } from 'redux-observable';
import { tap, filter, ignoreElements, map } from 'rxjs/operators';
import { _if } from 'rxjs/observable/if';
import { defer } from 'rxjs/observable/defer';
import { empty } from 'rxjs/observable/empty';

import { isCardAction, cardMapSelector, persistedCardParsed } from './';
import { types as app } from '../../redux';

const key = 'card';

export function persistCartEpic(actions, { getState }, { localStorage }) {
  return _if(
    () => !localStorage,
    defer(() => {
      console.log('no localStorage found');
      return empty();
    }),
    actions.pipe(
      filter(isCardAction),
      map(() => cardMapSelector(getState())),
      tap(cards => { localStorage.setItem(key, JSON.stringify(cards)); }),
      ignoreElements(),
    )
  );
}

export function loadCartEpic(actions, store, { localStorage }) {
  return _if(
    () => !localStorage,
    empty(),
    actions.ofType(app.appMounted).pipe(
      map(() => {
        let addresses;
        try {
          addresses = JSON.parse(localStorage.getItem(key));
        } catch (err) {
          console.log('error trying to parse card: ', err);
        }
        return addresses ? persistedCardParsed(addresses) : null;
      }),
      filter(Boolean),
    ),
  );
}

export default combineEpics(persistCartEpic, loadCartEpic);
