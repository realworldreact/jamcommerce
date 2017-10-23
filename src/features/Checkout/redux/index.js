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
    'clickOnCancelAddAddress',
    'submitNewAddress',
  ],
  ns,
);

export const submitNewAddress = createAction(
  types.submitNewAddress,
  undefined,
  makeAddressAction,
);

export const clickOnAddAddress = createAction(types.clickOnAddAddress);
export const clickOnCancelAddAddress = createAction(
  types.clickOnCancelAddAddress,
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
  showAddAddress: false,
};

const getNS = state => state[ns];
export const showAddAddressSelector = state => getNS(state).showAddAddress;
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
  }),
  defaultState,
  ns,
);
