import { actionTypes } from "../actions/actions";
const INITIAL_STATE = [];

const guessedWordReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.GUESS_WORD:
      return [...state, action.payload];
    default:
      return state;
  }
};

export default guessedWordReducer;
