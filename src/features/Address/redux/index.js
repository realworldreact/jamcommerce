export const ns = 'Address';

export const makeAddressAction = () => ({ address: { isAddress: true } });
export const isAddressAction = ({
  meta: { address: { isAddress } = {} } = {},
}) => !!isAddress;

export const addressSelector = state => state[ns];

export default function addressReducer(state = {}, action) {
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

addressReducer.toString = () => ns;
