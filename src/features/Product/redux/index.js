import { createAction } from 'redux-actions';
import { createTypes, handleActions } from 'berkeleys-redux-utils';

export const ns = 'product';

export const types = createTypes([ 'quantityChanged' ], ns);

export const quantityChanged = createAction(types.quantityChanged);
export const defaultState = {
  currentQuantity: null,
  quantities: [
    {
      value: 0,
      label: '0',
    },
    {
      value: 1,
      label: '1',
    },
    {
      value: 2,
      label: '2',
    },
    {
      value: 3,
      label: '3',
    },
  ],
};

const getNS = state => state[ns];

export const currentQuantitySelector = state => getNS(state).currentQuantity;
export const quantitiesSelector = state => getNS(state).quantities;

export default handleActions(
  () => ({
    [types.quantityChanged]: (state, { payload }) => ({
      ...state,
      currentQuantity: payload,
    }),
  }),
  defaultState,
  ns,
);
