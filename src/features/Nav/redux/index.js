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

const initialState = {
  isMenuOpen: false,
  menuContent: null,
};

export const getNS = state => state[ns];
export const clickOnSubNav = createAction(types.clickOnSubNav);
export const hoverOnSubNav = createAction(types.hoverOnSubNav);
export const mouseLeaveMenu = createAction(types.mouseLeaveMenu);

export const isMenuOpenSelector = state => getNS(state).isMenuOpen;

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
