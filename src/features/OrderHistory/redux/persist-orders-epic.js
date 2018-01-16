import { combineEpics } from 'redux-observable';
import { _do } from 'rxjs/operator/do';
import { _if } from 'rxjs/observable/if';
import { defer } from 'rxjs/observable/defer';
import { empty } from 'rxjs/observable/empty';
import { filter } from 'rxjs/operator/filter';
import { ignoreElements } from 'rxjs/operator/ignoreElements';
import { map } from 'rxjs/operator/map';

import { isOrdersAction, ordersSelector, persistedOrdersParsed } from './';
import { types as app } from '../../redux';

const key = 'orders';

export function persistOrdersEpic(actions, { getState }, { localStorage }) {
  return _if(
    () => !localStorage,
    defer(() => {
      console.log('no localStorage found');
      return empty();
    }),
    actions::filter(isOrdersAction)::map(() =>
      ordersSelector(getState()),
    )::_do(orders => {
      localStorage.setItem(key, JSON.stringify(orders));
    })::ignoreElements(),
  );
}

export function loadOrdersEpic(actions, store, { localStorage }) {
  return _if(
    () => !localStorage,
    empty(),
    actions.ofType(app.appMounted)::map(() => {
      let orders;
      try {
        orders = JSON.parse(localStorage.getItem(key));
      } catch (err) {
        console.log('error trying to parse address: ', err);
      }
      return orders ? persistedOrdersParsed(orders) : null;
    })::filter(Boolean),
  );
}

export default combineEpics(persistOrdersEpic, loadOrdersEpic);
