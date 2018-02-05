import _ from 'lodash';
import {
  createTypes,
  createAction,
  handleActions,
  combineActions,
} from 'berkeleys-redux-utils';
import { types as cartTypes } from '../../Cart/redux';

const ns = 'Products';

export const types = createTypes(
  ['clickOnProductPreview', 'clickOnClosePreview'],
  ns,
);

export const clickOnProductPreview = createAction(types.clickOnProductPreview);
export const clickOnClosePreview = createAction(
  types.clickOnClosePreview,
  _.noop,
);

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
    [combineActions(
      types.clickOnClosePreview,
      cartTypes.cartUpdate.complete,
    )]: state => {
      console.log('HAI?');
      return {
        ...state,
        showProductModal: null,
      };
    },
  }),
  defaultState,
  ns,
);
