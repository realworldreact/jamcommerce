import _ from 'lodash';
import {
  combineActions,
  createTypes,
  createAsyncTypes,
  handleActions,
} from 'berkeleys-redux-utils';
import { createAction } from 'redux-actions';
import { cartTypes, createCartMeta } from '../../../utils/redux.js';

const ns = 'cart';

export const types = createTypes(
  [
    createAsyncTypes('cartUpdate'),
    'commerceInitiated',
    'clickOnRemove',
  ],
  ns,
);

export const cartUpdateStarted = createAction(types.cartUpdate.start);
export const cartUpdateCompleted = createAction(types.cartUpdate.complete);
export const cartUpdateFailed = createAction(types.cartUpdate.error);
export const commerceInitiated = createAction(types.commerceInitiated);
export const clickOnRemove = createAction(types.clickOnRemove, null,
  createCartMeta(cartTypes.removeFromCart)
);

const defaultState = {
  items: {},
  subtotal: {},
  discount: {},
  couponDiscount: {},
  memberDiscount: {},
  taxes: {},
  total: {},
};

const getNS = state => state[ns];
export const itemsMapSelector = state => getNS(state).items || {};
export const itemsSelector = state => _.map(itemsMapSelector(state), item => item);
export const totalSelector = state => getNS(state).total;
export const numInCartSelector = state =>
  _.reduce(getNS(state).items, (numOf, item) => numOf + item.quantity, null);

export default handleActions(
  () => ({
    [combineActions(types.cartUpdate.complete, types.commerceInitiated)]: (
      state,
      { payload: cart },
    ) => ({
      ...cart,
    }),
  }),
  defaultState,
  ns,
);
