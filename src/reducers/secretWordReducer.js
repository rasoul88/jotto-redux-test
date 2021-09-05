import { actionTypes } from "../actions/actions";
const secretWordReducer = (state = null, action) => {
  switch (action.type) {
    case actionTypes.SET_SECRET_WORD:
      return action.payload;
    default:
      return state;
  }
};

export default secretWordReducer;
