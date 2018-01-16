import {
  combineActions,
  createAction,
  createAsyncTypes,
  createTypes,
  handleActions,
} from 'berkeleys-redux-utils';

import { types as checkoutTypes } from '../../Checkout/redux';
import persistOrdersEpic from './persist-orders-epic.js';

export const ns = 'orders';
export const epics = [persistOrdersEpic];

export const types = {
  ...createTypes(['persistedOrdersParsed'], ns),
  postOrder: checkoutTypes.postOrder,
};

export const persistedOrdersParsed = createAction(types.persistedOrdersParsed);

export const isOrdersAction = ({ type }) =>
  type === checkoutTypes.postOrder.complete;

const getNS = state => state[ns];
export const ordersSelector = state => getNS(state).history;

const defaultState = { history: [] };

export default handleActions(
  () => ({
    [types.postOrder.complete]: (state, { payload: order }) => ({
      ...state,
      history: [...state.history, order],
    }),
    [types.persistedOrdersParsed]: (state, { payload }) => ({
      ...state,
      history: payload,
    }),
  }),
  defaultState,
  ns,
);
