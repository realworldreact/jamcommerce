import _ from 'lodash';
import { createAction, combineActions, handleActions } from 'redux-actions';
import { createTypes } from 'redux-create-types';

const ns = 'nav';

const types = createTypes(
  [
    'clickOnSubNav',
    'hoverOnSubNav',
    'mouseLeaveMenu',
  ],
  ns,
);

const womansLink = '/womans';
const initialState = {
  isMenuOpen: false,
  menuContent: null,
  items: [
    {
      name: 'New Arrivals',
      href: womansLink,
    },
    {
      name: 'Womans',
      href: womansLink,
    },
    {
      name: 'Mens',
      href: womansLink,
    },
    {
      name: 'Collections',
      href: womansLink,
    },
    {
      name: 'Sales',
      href: womansLink,
    },
  ],
};

export const clickOnSubNav = createAction(types.clickOnSubNav);
export const hoverOnSubNav = createAction(types.hoverOnSubNav);
export const mouseLeaveMenu = createAction(types.mouseLeaveMenu, _.noop);

export const getNS = state => state[ns];

export const isMenuOpenSelector = state => getNS(state).isMenuOpen;
export const itemsSelector = state => getNS(state).items;

export default function createReducer() {
  const reducer = handleActions(
    {
      [combineActions(types.clickOnSubNav, types.hoverOnSubNav)]: (
        state,
        { payload: item },
      ) => ({
        ...state,
        isMenuOpen: true,
        menuContent: item,
      }),
      [types.mouseLeaveMenu]: state => ({
        ...state,
        isMenuOpen: false,
      }),
    },
    initialState,
  );
  reducer.toString = () => ns;
  return reducer;
}
