import { combineEpics } from 'redux-observable';
import { _do } from 'rxjs/operator/do';
import { _if } from 'rxjs/observable/if';
import { defer } from 'rxjs/observable/defer';
import { empty } from 'rxjs/observable/empty';
import { filter } from 'rxjs/operator/filter';
import { ignoreElements } from 'rxjs/operator/ignoreElements';
import { map } from 'rxjs/operator/map';

import { isAddressAction, addressSelector, persistedAddressParsed } from './';
import { types as app } from '../../redux';

const key = 'address';

export function persistAddressEpic(actions, { getState }, { localStorage }) {
  return _if(
    () => !localStorage,
    defer(() => {
      console.log('no localStorage found');
      return empty();
    }),
    actions::filter(isAddressAction)::map(() =>
      addressSelector(getState()),
    )::_do(address => {
      localStorage.setItem(key, JSON.stringify(address));
    })::ignoreElements(),
  );
}

export function loadAddressEpic(actions, store, { localStorage }) {
  return _if(
    () => !localStorage,
    empty(),
    actions.ofType(app.appMounted)::map(() => {
      let addresses;
      try {
        addresses = JSON.parse(localStorage.getItem(key));
      } catch (err) {
        console.log('error trying to parse address: ', err);
      }
      return addresses ? persistedAddressParsed(addresses) : null;
    })::filter(Boolean),
  );
}

export default combineEpics(persistAddressEpic, loadAddressEpic);
