import { navigateTo } from 'gatsby-link';
import { switchMap } from 'rxjs/operator/switchMap';
import { _do } from 'rxjs/operator/do';
import { ignoreElements } from 'rxjs/operator/ignoreElements';

import { types } from './';
import { types as cart } from '../../Cart/redux';

export default function navigationEpic(actions) {
  return actions.ofType(types.clickOnAddToCart)::switchMap(() =>
    actions.ofType(cart.cartUpdate.complete)::_do(() => navigateTo('/cart')),
  )::ignoreElements();
}
