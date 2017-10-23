import {
  combineActions,
  createAction,
  createTypes,
  handleActions,
} from 'berkeleys-redux-utils';
import { makeAddressAction } from '../../Address/redux';

export const ns = 'checkout';

export const types = createTypes(
  [
    'clickOnAddAddress',
    'clickOnAddress',
    'clickOnBilling',
    'clickOnCancelAddAddress',
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
};

const defaultState = {
  selectedAddress: null,
  showAddAddress: false,
  showBilling: false,
};

const getNS = state => state[ns];
export const selectedAddressSelector = state => getNS(state).selectedAddress;
export const showAddAddressSelector = state => getNS(state).showAddAddress;
export const showBillingSelector = state => getNS(state).showBilling;

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
    }),
  }),
  defaultState,
  ns,
);
