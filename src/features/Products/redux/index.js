import _ from 'lodash';
import { createTypes, createAction, handleActions } from 'berkeleys-redux-utils';

const ns = 'Products';

export const types = createTypes([ 'clickOnProductPreview', 'clickOnClosePreview' ], ns);

export const clickOnProductPreview = createAction(types.clickOnProductPreview);
export const clickOnClosePreview = createAction(types.clickOnClosePreview, _.noop);

const defaultState = {
  showProductModal: null,
};

const getNS = state => state[ns];
export const showProductModalSelector = state => getNS(state).showProductModal;

export default handleActions(
  () => ({
    [types.clickOnProductPreview]: (state, { payload: name }) => ({
      ...state,
      showProductModal: name,
    }),
  }),
  defaultState,
  ns,
);
