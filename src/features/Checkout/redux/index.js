import _ from 'lodash';
import {
  combineActions,
  createAction,
  createAsyncTypes,
  createTypes,
  handleActions,
} from 'berkeleys-redux-utils';

import checkoutEpic from './checkout-epic.js';
import { makeAddressAction } from '../../Address/redux';
import { addRedirectTo } from '../../redux';
import { createCartMeta, cartTypes } from '../../../utils/redux.js';

export const epics = [ checkoutEpic ];
export const ns = 'checkout';

export const types = createTypes(
  [
    'clickOnAddAddress',
    'clickOnAddress',
    'clickOnBilling',
    'clickOnCancelAddAddress',
    'clickOnConfirm',
    'clickOnNextConfirm',
    'checkoutError',
    createAsyncTypes('createToken'),
    createAsyncTypes('postOrder'),
    createAsyncTypes('postPayment'),
    'didMountWithoutAuth',
    'submitNewAddress',
    'willUnmount',
  ],
  ns,
);

export const clickOnAddAddress = createAction(types.clickOnAddAddress);
export const clickOnAddress = createAction(types.clickOnAddress);
export const clickOnBilling = createAction(types.clickOnBilling, _.noop);
export const clickOnCancelAddAddress = createAction(
  types.clickOnCancelAddAddress,
);
export const clickOnConfirm = createAction(types.clickOnConfirm, _.noop);
export const clickOnNextConfirm = createAction(
  types.clickOnNextConfirm,
  _.noop,
);
export const checkoutError = createAction(types.checkoutError);
export const createTokenStart = createAction(types.createToken.start);
export const createTokenComplete = createAction(types.createToken.complete);
export const createTokenError = createAction(types.createToken.error);

export const postOrderComplete = createAction(types.postOrder.complete);
export const postPaymentComplete = createAction(
  types.postPayment.complete,
  undefined,
  createCartMeta(cartTypes.clearCart),
);

export const didMountWithoutAuth = createAction(
  types.didMountWithoutAuth,
  undefined,
  addRedirectTo,
);
export const submitNewAddress = createAction(
  types.submitNewAddress,
  address => ({ ...address, country: 'USA' }),
  makeAddressAction,
);
export const willUnmount = createAction(types.willUnmount);

export const formModels = {
  newAddress: {
    name: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    zip: '',
  },
  billing: { name: '' },
};

const defaultState = {
  selectedAddress: null,
  showAddAddress: false,
  showBilling: false,
  showConfirm: false,
  showSuccess: false,
  card: {},
  order: {},
  transaction: {},
};

const getNS = state => state[ns];
export const selectedAddressSelector = state => getNS(state).selectedAddress;
export const showAddAddressSelector = state => getNS(state).showAddAddress;
export const showBillingSelector = state => getNS(state).showBilling;
export const showConfirmSelector = state => getNS(state).showConfirm;
export const showSuccessSelector = state => getNS(state).showSuccess;
export const cardSelector = state => getNS(state).card;
export const orderSelector = state => getNS(state).order;
export const transationSelector = state => getNS(state).transation;

export default handleActions(
  () => ({
    [types.clickOnAddAddress]: state => ({
      ...state,
      showAddAddress: true,
    }),
    [combineActions(
      types.submitNewAddress,
      types.clickOnCancelAddAddress,
    )]: state => ({
      ...state,
      showAddAddress: false,
    }),
    [types.clickOnAddress]: (state, { payload: selectedAddress }) => ({
      ...state,
      selectedAddress,
    }),
    [types.clickOnBilling]: state => ({
      ...state,
      showBilling: true,
      showConfirm: false,
    }),
    [types.clickOnNextConfirm]: state => ({
      ...state,
      showBilling: false,
      showConfirm: true,
    }),
    [types.createToken.complete]: (state, { payload: card }) => ({
      ...state,
      card,
      showBilling: false,
      showConfirm: true,
    }),
    [types.postOrder.complete]: (state, { payload: order }) => ({
      ...state,
      order,
    }),
    [types.postPayment.complete]: (state, { payload: transaction }) => ({
      ...state,
      transaction,
      showConfirm: false,
      showSuccess: true,
    }),
    [types.willUnmount]: state => ({
      ...state,
      showBilling: false,
      showConfirm: false,
      showSuccess: false,
    }),
  }),
  defaultState,
  ns,
);
