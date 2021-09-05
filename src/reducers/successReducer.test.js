import successReducer from "./successReducer";
// import { correctGuess } from "../actions/actions";

describe("successReducer", () => {
  test("returns default initial state of `false` when no action is passed", () => {
    const state = successReducer(undefined, {});
    expect(state).toBe(false);
  });
  test("returns state of true upon recieving an action of type `CORRECT_GUESS`", () => {
    // const state = successReducer(undefined, correctGuess());
    // expect(state.success).toBe(true);
  });
});
