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
  ...createTypes(
    ['persistedOrdersParsed', 'showOrderDetails', 'backToHistory'],
    ns,
  ),
  postOrder: checkoutTypes.postOrder,
};

export const persistedOrdersParsed = createAction(types.persistedOrdersParsed);
export const showOrderDetails = createAction(types.showOrderDetails);
export const backToHistory = createAction(types.backToHistory);

export const isOrdersAction = ({ type }) =>
  type === checkoutTypes.postOrder.complete;

const getNS = state => state[ns];
export const ordersSelector = state => getNS(state).history;
export const currentOrderSelector = state => getNS(state).currentOrder;
export const showOrderDetailsSelector = state => getNS(state).showOrderDetails;

const defaultState = {
  history: [],
  currentOrder: null,
  showOrderDetails: false,
};

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
    [types.showOrderDetails]: (state, { payload: order }) => ({
      ...state,
      currentOrder: order,
      showOrderDetails: true,
    }),
    [types.backToHistory]: state => ({
      ...state,
      currentOrder: null,
      showOrderDetails: false,
    }),
  }),
  defaultState,
  ns,
);
