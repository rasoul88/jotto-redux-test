import { storeFactory } from "./testUtils";
import { guessWord } from "../actions/actions";

describe("guessWord action dispatcher", () => {
  const secretWord = "party";
  const unsuccessGuessedWord = "train";

  describe("no guessed words", () => {
    let store;
    const initialState = { secretWord };
    beforeEach(() => {
      store = storeFactory(initialState);
    });

    test("update state correctly for unsuccessful guess", () => {
      store.dispatch(guessWord(unsuccessGuessedWord));
      const expectedState = {
        ...initialState,
        success: false,
        guessedWords: [
          {
            guessedWord: unsuccessGuessedWord,
            letterMatchCount: 3,
          },
        ],
      };
      const newState = store.getState();
      expect(newState).toEqual(expectedState);
    });

    test("update state correctly for successful guess", () => {
      store.dispatch(guessWord(secretWord));
      const expectedState = {
        ...initialState,
        success: true,
        guessedWords: [
          {
            guessedWord: secretWord,
            letterMatchCount: 5,
          },
        ],
      };
      const newState = store.getState();
      expect(newState).toEqual(expectedState);
    });
  });

  describe("some guessed words", () => {
    let store;
    const guessedWords = [{ guessedWord: "agile", letterMatchCount: 1 }];
    const initialState = { secretWord, guessedWords };
    beforeEach(() => {
      store = storeFactory(initialState);
    });

    test("update state correctly for unsuccessful guess", () => {
      store.dispatch(guessWord(unsuccessGuessedWord));
      const expectedState = {
        ...initialState,
        success: false,
        guessedWords: [
          ...guessedWords,
          {
            guessedWord: unsuccessGuessedWord,
            letterMatchCount: 3,
          },
        ],
      };
      const newState = store.getState();
      expect(newState).toEqual(expectedState);
    });
    test("update state correctly for successful guess", () => {
      store.dispatch(guessWord(secretWord));
      const expectedState = {
        ...initialState,
        success: true,
        guessedWords: [
          ...guessedWords,
          {
            guessedWord: secretWord,
            letterMatchCount: 5,
          },
        ],
      };
      const newState = store.getState();
      expect(newState).toEqual(expectedState);
    });
  });
});
