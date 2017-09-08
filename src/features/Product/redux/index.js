import { createAction } from 'redux-actions';
import { createTypes, handleActions } from 'berkeleys-redux-utils';

export const ns = 'product';

export const types = createTypes(
  [
    'currentSizeChanged',
    'quantityChanged',
    'sizeChanged',
    'thumbnailClicked',
  ],
  ns,
);

export const quantityChanged = createAction(types.quantityChanged);
export const currentSizeChanged = createAction(types.currentSizeChanged);
export const thumbnailClicked = createAction(types.thumbnailClicked);

export const defaultState = {
  currentImage: 'front',
  currentQuantity: null,
  currentSize: null,
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
export const currentSizeSelector = state => getNS(state).currentSize;
export const currentImageSelector = state => getNS(state).currentImage;

export default handleActions(
  () => ({
    [types.quantityChanged]: (state, { payload }) => ({
      ...state,
      currentQuantity: payload,
    }),
    [types.currentSizeChanged]: (state, { payload }) => ({
      ...state,
      currentSize: payload,
    }),
    [types.thumbnailClicked]: (state, { payload }) => ({
      ...state,
      currentImage: payload || 'front',
    }),
  }),
  defaultState,
  ns,
);
