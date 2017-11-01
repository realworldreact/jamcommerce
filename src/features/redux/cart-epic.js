import { ofType, combineEpics } from 'redux-observable';
import { empty } from 'rxjs/observable/empty';
import { _if } from 'rxjs/observable/if';
import { of } from 'rxjs/observable/of';
import { _throw } from 'rxjs/observable/throw';
import { defer } from 'rxjs/observable/defer';
import { tap, catchError, filter, map, mergeMap } from 'rxjs/operators';

import { types } from './';
import {
  cartUpdateFailed,
  cartUpdateCompleted,
  commerceInitiated,
  itemsMapSelector,
} from '../Cart/redux';
import { cartTypes, isCartAction, getCartMeta } from '../../utils/redux.js';

function filterCommerceActions(_type) {
  return source =>
    source.pipe(
      filter(isCartAction),
      map(getCartMeta),
      filter(Boolean),
      filter(({ type }) => type === _type),
    );
}

function catchCommercerError() {
  return source =>
    source.pipe(
      catchError(err => _throw(!(err instanceof Error) ? new Error(err) : err)),
      catchError(err => [ cartUpdateFailed(err) ]),
    );
}

export function cartInit(actions, store, { commerce }) {
  return _if(
    () => !commerce,
    empty(),
    actions.pipe(
      ofType(types.appMounted),
      map(() => commerceInitiated(commerce.getCart())),
    ),
  );
}

export function addToCart(actions, { getState }, { commerce }) {
  return _if(
    () => !commerce,
    empty(),
    actions.pipe(
      filterCommerceActions(cartTypes.addToCart),
      mergeMap(({ type, payload: product }) =>
        _if(
          () => !itemsMapSelector(getState())[product.sku],
          defer(() => commerce.addToCart(product)),
          defer(() => {
            commerce.updateCart(product.sku, product.quantity);
            return of(commerce.getCart());
          }),
        ).pipe(map(cartUpdateCompleted), catchCommercerError(type)),
      ),
    ),
  );
}

export function removeFromCart(actions, store, { commerce }) {
  return _if(
    () => !commerce,
    empty(),
    actions.pipe(
      filterCommerceActions(cartTypes.removeFromCart),
      mergeMap(({ type, payload: sku }) =>
        of(commerce.updateCart(sku, 0)).pipe(
          map(() => commerce.getCart()),
          map(cartUpdateCompleted),
          catchCommercerError(type),
        ),
      ),
    ),
  );
}

export function clearCart(actions, store, { commerce }) {
  return _if(
    () => !commerce,
    empty(),
    actions.pipe(
      filterCommerceActions(cartTypes.clearCart),
      tap(() => commerce.clearCart()),
      map(() => commerce.getCart()),
      map(cartUpdateCompleted),
    ),
  );
}
export default combineEpics(cartInit, addToCart, removeFromCart, clearCart);
