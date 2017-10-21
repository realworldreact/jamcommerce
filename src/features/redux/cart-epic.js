import { combineEpics } from 'redux-observable';
import { EmptyObservable } from 'rxjs/observable/EmptyObservable';
import { _catch } from 'rxjs/operator/catch';
import { _if } from 'rxjs/observable/if';
import { of } from 'rxjs/observable/of';
import { _throw } from 'rxjs/observable/throw';
import { defer } from 'rxjs/observable/defer';
import { filter } from 'rxjs/operator/filter';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { map } from 'rxjs/operator/map';
import { mergeMap } from 'rxjs/operator/mergeMap';
// import { _do } from 'rxjs/operator/do';

import { types } from './';
import {
  cartUpdateFailed,
  cartUpdateCompleted,
  commerceInitiated,
  itemsMapSelector,
} from '../Cart/redux';
import { cartTypes, isCartAction, getCartMeta } from '../../utils/redux.js';

export function cartInit(actions, store, { commerce }) {
  if (!commerce) {
    return EmptyObservable.create();
  }
  return actions.ofType(types.appMounted)::map(() =>
    commerceInitiated(commerce.getCart()),
  );
}
function filterCommerceActions(_type) {
  return this::filter(isCartAction)::map(getCartMeta)::filter(Boolean)::filter(
    ({ type }) => type === _type,
  );
}

function catchCommercerError() {
  return this::_catch(err =>
    _throw(!(err instanceof Error) ? new Error(err) : err),
  )::_catch(err => [ cartUpdateFailed(err) ]);
}

export function addToCart(actions, store, { commerce }) {
  return _if(
    () => !commerce,
    EmptyObservable.create(),
    actions::filterCommerceActions(
      cartTypes.addToCart,
    )::mergeMap(({ type, payload: product }) =>
      _if(
        () => !itemsMapSelector(store.getState())[product.sku],
        defer(() => fromPromise(commerce.addToCart(product))),
        defer(() => {
          commerce.updateCart(product.sku, product.quantity);
          return of(commerce.getCart());
        }),
      )::map(cartUpdateCompleted)::catchCommercerError(type),
    ),
  );
}

export function removeFromCart(actions, store, { commerce }) {
  return _if(
    () => !commerce,
    EmptyObservable.create(),
    actions::filterCommerceActions(
      cartTypes.removeFromCart,
    )::mergeMap(({ type, payload: sku }) =>
      defer(() => of(commerce.updateCart(sku, 0)))::map(() =>
        commerce.getCart(),
      )::map(cartUpdateCompleted)::catchCommercerError(type),
    ),
  );
}
export default combineEpics(cartInit, addToCart, removeFromCart);
