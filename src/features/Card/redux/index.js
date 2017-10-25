import {
  createTypes,
  composeReducers,
  handleActions,
} from 'berkeleys-redux-utils';

const ns = 'card';
export const types = createTypes([], ns);

export const isCardAction = ({ meta: { card } = {} }) => !!card;
export const makeCardMeta = () => ({
  card: {},
});

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
  // handleActions(
  //   () => ({
  //   })
  // )
);
