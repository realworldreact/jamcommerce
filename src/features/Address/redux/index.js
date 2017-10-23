import {
  composeReducers,
  createAction,
  createTypes,
  handleActions,
} from 'berkeleys-redux-utils';
import persistAddressEpic from './persist-address-epic.js';

export const epics = [ persistAddressEpic ];

export const ns = 'Address';
export const types = createTypes([ 'persistedAddressParsed' ], ns);

export const persistedAddressParsed = createAction(
  types.persistedAddressParsed,
);

export const makeAddressAction = () => ({ address: { isAddress: true } });
export const isAddressAction = ({
  meta: { address: { isAddress } = {} } = {},
}) => !!isAddress;

export const addressSelector = state => state[ns];

export function addressReducer(state = {}, action) {
  if (isAddressAction(action)) {
    const address = { ...action.payload };
    const n = Object.keys(state).length + 1;
    if (!address.id) {
      address.id = n;
    }
    return {
      [address.id]: {
        ...state[address.id],
        ...address,
      },
    };
  }
  return state;
}

export default composeReducers(
  ns,
  addressReducer,
  handleActions(
    () => ({
      [types.persistedAddressParsed]: (state, { payload }) => ({
        ...state,
        ...payload,
      }),
    }),
    {},
  ),
);
