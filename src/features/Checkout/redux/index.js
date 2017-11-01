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
import { makeCardMeta } from '../../Card/redux';

export const epics = [ checkoutEpic ];
export const ns = 'checkout';

export const types = createTypes(
  [
    'clickOnAddAddress',
    'clickOnAddCard',
    'clickOnAddress',
    'clickOnBilling',
    'clickOnCancelAddAddress',
    'clickOnCancelCard',
    'clickOnCard',
    'clickOnConfirm',
    'clickOnNextConfirm',
    'checkoutError',
    createAsyncTypes('createToken'),
    createAsyncTypes('postOrder'),
    createAsyncTypes('postPayment'),
    'submitNewAddress',
  ],
  ns,
);

export const clickOnAddAddress = createAction(types.clickOnAddAddress);
export const clickOnAddCard = createAction(types.clickOnAddCard, _.noop);
export const clickOnAddress = createAction(types.clickOnAddress);
export const clickOnBilling = createAction(types.clickOnBilling, _.noop);
export const clickOnCancelAddAddress = createAction(
  types.clickOnCancelAddAddress,
);
export const clickOnCancelCard = createAction(types.clickOnCancelCard);
export const clickOnCard = createAction(types.clickOnCard);
export const clickOnConfirm = createAction(types.clickOnConfirm, _.noop);
export const clickOnNextConfirm = createAction(
  types.clickOnNextConfirm,
  _.noop,
);
export const checkoutError = createAction(types.checkoutError);
export const createTokenStart = createAction(types.createToken.start);
export const createTokenComplete = createAction(
  types.createToken.complete,
  undefined,
  makeCardMeta,
);
export const createTokenError = createAction(types.createToken.error);

export const postOrderComplete = createAction(types.postOrder.complete);
export const postPaymentComplete = createAction(types.postPayment.complete);

export const submitNewAddress = createAction(
  types.submitNewAddress,
  address => ({ ...address, country: 'USA' }),
  makeAddressAction,
);

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
  selectedCard: null,
  showAddAddress: false,
  showAddCard: false,
  showBilling: false,
  showConfirm: false,
  showSuccess: false,
};

const getNS = state => state[ns];
export const selectedAddressSelector = state => getNS(state).selectedAddress;
export const selectedCardSelector = state => getNS(state).selectedCard;
export const showAddAddressSelector = state => getNS(state).showAddAddress;
export const showAddCardSelector = state => getNS(state).showAddCard;
export const showBillingSelector = state => getNS(state).showBilling;
export const showConfirmSelector = state => getNS(state).showConfirm;
export const showSuccessSelector = state => getNS(state).showSuccess;

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
    [types.clickOnCard]: (state, { payload: selectedCard }) => ({
      ...state,
      selectedCard,
    }),
    [types.clickOnAddCard]: state => ({
      ...state,
      showAddCard: true,
    }),
    [types.clickOnCancelCard]: state => ({
      ...state,
      showAddCard: false,
    }),
    [types.clickOnNextConfirm]: state => ({
      ...state,
      showBilling: false,
      showConfirm: true,
    }),
    [types.createToken.complete]: (state, { payload: { id } }) => ({
      ...state,
      selectedCard: id,
      showAddCard: false,
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
  }),
  defaultState,
  ns,
);
