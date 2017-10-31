import { _if } from 'rxjs/observable/if';
import { defer } from 'rxjs/observable/defer';
import { empty } from 'rxjs/observable/empty';
import { switchMap, map, catchError, startWith } from 'rxjs/operators';

import {
  checkoutError,
  postOrderComplete,
  postPaymentComplete,
  selectedAddressSelector,
  selectedCardSelector,
  types,
} from './';
import { emailSelector } from '../../Auth/redux';
import { addressSelector } from '../../Address/redux';
import { cardMapSelector } from '../../Card/redux';

export default function checkoutEpic(actions, { getState }, { commerce }) {
  return _if(
    () => !commerce,
    empty(),
    actions.ofType(types.clickOnConfirm).pipe(
      map(() => getState()),
      switchMap(state => {
        const email = emailSelector(state);
        const address = addressSelector(state)[selectedAddressSelector(state)];
        const { token } =
          cardMapSelector(state)[selectedCardSelector(state)] || {};
        return defer(() =>
          commerce.order({
            email,
            /* eslint-disable camelcase */
            shipping_address: address,
            /* eslint-enable camelcase */
          }),
        ).pipe(
          switchMap(({ cart, order }) =>
            defer(() =>
              commerce.payment({
                /* eslint-disable camelcase */
                stripe_token: token,
                order_id: order.id,
                /* eslint-enable camelcase */
                amount: cart.total.cents,
                provider: 'stripe',
              }),
            ).pipe(
              map(postPaymentComplete),
              startWith(postOrderComplete(order)),
            ),
          ),
          catchError(err => [ checkoutError(err) ]),
        );
      }),
    ),
  );
}
