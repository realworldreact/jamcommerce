import { createAction, handleActions } from 'redux-actions';
import { createTypes } from 'redux-create-types';

const ns = 'nav';

const types = createTypes([
  'clickOnSubNav',
  'mouseLeaveMenu',
], ns);

const initialState = {
  isMenuOpen: false,
  menuContent: null,
};

export const getNS = state => state[ns];
export const clickOnSubNav = createAction(types.clickOnSubNav);
export const mouseLeaveMenu = createAction(types.mouseLeaveMenu);

export const isMenuOpenSelector = state => getNS(state).isMenuOpen;

export default function createReducer() {
  const reducer = handleActions(
    {
      [types.clickOnSubNav]: (state, { payload: item }) => ({
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
