import { EmptyObservable } from 'rxjs/observable/EmptyObservable';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { map } from 'rxjs/operator/map';
import { switchMap } from 'rxjs/operator/switchMap';
import { _catch } from 'rxjs/operator/catch';
import { filter } from 'rxjs/operator/filter';
import { _throw } from 'rxjs/observable/throw';

import { cartUpdateFailed, cartUpdateCompleted } from '../Cart/redux';
import { isCartAction, getCartMeta } from '../../utils/redux.js';

export function addToCart(action, store, { commerce }) {
  if (!commerce) {
    return EmptyObservable.create();
  }
  return action::filter(isCartAction)::map(getCartMeta)::filter(
    Boolean,
  )::switchMap(product =>
    fromPromise(commerce.addToCart(product))::map(
      cartUpdateCompleted,
    )::_catch(err =>
      _throw(!(err instanceof Error) ? new Error(err) : err),
    )::_catch(err => [ cartUpdateFailed(err) ]),
  );
}
export default addToCart;
