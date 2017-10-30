import {
  createTypes,
  createAction,
  composeReducers,
  handleActions,
} from 'berkeleys-redux-utils';

import persistCartEpic from './pesist-card-epic.js';

export const epics = [ persistCartEpic ];

const ns = 'card';
export const isCardAction = ({ meta: { card } = {} }) => !!card;
export const makeCardMeta = () => ({
  card: {},
});

export const types = createTypes([ 'persistedCardParsed' ], ns);

export const persistedCardParsed = createAction(types.persistedCardParsed);

const defaultState = {};

const getNS = state => state[ns];
export const cardMapSelector = getNS;

function cardReducer(state = {}, action) {
  if (isCardAction(action)) {
    const card = action.payload;
    return {
      ...state,
      [card.id]: {
        ...state[card.id],
        ...card,
      },
    };
  }
  return state;
}

export default composeReducers(
  ns,
  cardReducer,
  handleActions(
    () => ({
      [types.persistedCardParsed]: (state, { payload }) => ({
        ...state,
        ...payload,
      }),
    }),
    defaultState,
  ),
);
