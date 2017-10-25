import {
  combineActions,
  createAction,
  createAsyncTypes,
  createTypes,
  handleActions,
} from 'berkeleys-redux-utils';
import { makeAddressAction } from '../../Address/redux';
import { makeCardMeta } from '../../Card/redux';

export const ns = 'checkout';

export const types = createTypes(
  [
    'clickOnAddAddress',
    'clickOnAddress',
    'clickOnBilling',
    'clickOnNextConfirm',
    'clickOnCancelAddAddress',
    createAsyncTypes('createToken'),
    'submitNewAddress',
  ],
  ns,
);

export const clickOnAddAddress = createAction(types.clickOnAddAddress);
export const clickOnAddress = createAction(types.clickOnAddress);
export const clickOnBilling = createAction(types.clickOnBilling);
export const clickOnCancelAddAddress = createAction(
  types.clickOnCancelAddAddress,
);
export const clickOnNextConfirm = createAction(types.clickOnNextConfirm);
export const createTokenStart = createAction(types.createToken.start);
export const createTokenComplete = createAction(
  types.createToken.complete,
  undefined,
  makeCardMeta,
);
export const createTokenError = createAction(types.createToken.error);

export const submitNewAddress = createAction(
  types.submitNewAddress,
  undefined,
  makeAddressAction,
);

export const formModels = {
  newAddress: {
    name: '',
    address: '',
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
};

const getNS = state => state[ns];
export const selectedAddressSelector = state => getNS(state).selectedAddress;
export const showAddAddressSelector = state => getNS(state).showAddAddress;
export const showBillingSelector = state => getNS(state).showBilling;
export const showConfirmSelector = state => getNS(state).showConfirm;

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
    [types.createToken.complete]: state => ({
      ...state,
      showBilling: false,
      showConfirm: true,
    }),
  }),
  defaultState,
  ns,
);
