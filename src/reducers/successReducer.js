const INITIAL_STATE = false;
const successReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "CORRECT_GUESS":
      return true;
    default:
      return state;
  }
};

export default successReducer;
