import {
  composeReducers,
  createAction,
  createTypes,
  handleActions,
  combineActions,
} from 'berkeleys-redux-utils';
import { createSelector } from 'reselect';
import { actions } from 'react-redux-form';

import persistAddressEpic from './persist-address-epic.js';
import { types as authTypes } from '../../Auth/redux';

export const epics = [persistAddressEpic];

export const ns = 'address';
export const types = createTypes(
  [
    'persistedAddressParsed',
    'clickOnAddAddress',
    'clickOnCancelAddAddress',
    'submitNewAddress',
    'deleteAddress',
    'editAddress',
    'closeEditAddress',
  ],
  ns,
);

export const persistedAddressParsed = createAction(
  types.persistedAddressParsed,
);

export const makeAddressAction = () => ({ address: { isAddress: true } });
export const isAddressAction = ({
  meta: { address: { isAddress } = {} } = {},
}) => !!isAddress;
export const isAddressChangeAction = (...args) =>
  args[0].type === types.deleteAddress ||
  args[0].type === authTypes.userSignupSuccess ||
  isAddressAction(...args);
export const clickOnAddAddress = createAction(types.clickOnAddAddress);
export const clickOnCancelAddAddress = createAction(
  types.clickOnCancelAddAddress,
);
export const submitNewAddress = createAction(
  types.submitNewAddress,
  address => ({ ...address, country: 'USA' }),
  makeAddressAction,
);
export const deleteAddress = createAction(types.deleteAddress);
export const editAddress = createAction(types.editAddress);
export const closeEditAddress = createAction(types.closeEditAddress);
export const updateEditAddress = address =>
  actions.merge('forms.editAddress', address);

export const formModels = {
  newAddress: {
    name: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    zip: '',
  },
  editAddress: {
    name: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    zip: '',
  },
};

const getNS = state => state[ns];
export const addressSelector = state => state[ns];
export const showAddAddressSelector = state => getNS(state).showAddAddress;

export const selectedAddressSelector = state => state.checkout.selectedAddress;
export const shippingAddressSelector = createSelector(
  addressSelector,
  selectedAddressSelector,
  (addresses, id) => addresses[id],
);
export const showEditAddressModalSelector = state =>
  getNS(state).showEditAddressModal;

export function addressReducer(state = {}, action) {
  if (isAddressAction(action)) {
    const address = { ...action.payload };
    const n = Object.keys(state).length + 1;
    if (!address.id) {
      address.id = String(n);
    }
    return {
      ...state,
      [address.id]: {
        ...state[address.id],
        ...address,
      },
    };
  }
  return state;
}

export function addressDeleteReducer(state = {}, action) {
  if (action.type === types.deleteAddress) {
    // delete state[action.payload];
    // console.log(state[action.payload], state);
    return { ...state, [action.payload]: null };
  }
  return state;
}

console.log(authTypes);

export default composeReducers(
  ns,
  addressReducer,
  addressDeleteReducer,
  handleActions(
    () => ({
      [types.persistedAddressParsed]: (state, { payload }) => ({
        ...state,
        ...payload,
      }),
      [types.clickOnAddAddress]: state => ({
        ...state,
        showAddAddress: true,
      }),
      [combineActions(
        types.submitNewAddress,
        types.clickOnCancelAddAddress,
        types.closeEditAddress,
      )]: state => ({
        ...state,
        showAddAddress: false,
        showEditAddressModal: null,
      }),
      [types.editAddress]: (state, { payload }) => ({
        ...state,
        showEditAddressModal: payload,
      }),
      [authTypes.userSignupSuccess]: state => ({}),
    }),
    {},
  ),
);
