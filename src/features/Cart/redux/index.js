import {
  createTypes,
  createAsyncTypes,
  handleActions,
} from 'berkeleys-redux-utils';
import { createAction } from 'redux-actions';

const ns = 'cart';

export const types = createTypes([ createAsyncTypes('cartUpdate') ], ns);

export const cartUpdateStarted = createAction(types.cartUpdate.start);
export const cartUpdateCompleted = createAction(types.cartUpdate.complete);
export const cartUpdateFailed = createAction(types.cartUpdate.error);

export default handleActions(
  () => ({
    [types.cartUpdate.complete]: (state, { payload: cart }) => ({
      ...state,
      cart,
    }),
  }),
  {},
  ns,
);
