import {
  combineActions,
  createTypes,
  createAsyncTypes,
  handleActions,
} from 'berkeleys-redux-utils';
import { createAction } from 'redux-actions';

const ns = 'cart';

export const types = createTypes(
  [
    createAsyncTypes('cartUpdate'),
    'commerceInitiated',
  ],
  ns,
);

export const cartUpdateStarted = createAction(types.cartUpdate.start);
export const cartUpdateCompleted = createAction(types.cartUpdate.complete);
export const cartUpdateFailed = createAction(types.cartUpdate.error);
export const commerceInitiated = createAction(types.commerceInitiated);

export default handleActions(
  () => ({
    [combineActions(types.cartUpdate.complete, types.commerceInitiated)]: (
      state,
      { payload: cart },
    ) => ({
      ...state,
      cart,
    }),
  }),
  {},
  ns,
);
