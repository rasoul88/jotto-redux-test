import axios from "axios";
import { getLetterMatchCount } from "../helper";
export const actionTypes = {
  CORRECT_GUESS: "CORRECT_GUESS",
  GUESS_WORD: "GUESS_WORD",
  SET_SECRET_WORD: "SET_SECRET_WORD",
};

export const correctGuess = () => ({
  type: actionTypes.CORRECT_GUESS,
});

export const setGuessedWord = (word, letterMatchCount) => ({
  type: actionTypes.GUESS_WORD,
  payload: {
    guessedWord: word,
    letterMatchCount: letterMatchCount,
  },
});

export const setSecretWord = (secretWord) => ({
  type: actionTypes.SET_SECRET_WORD,
  payload: secretWord,
});

export const getSecretWord = () => {
  return (dispatch) => {
    return axios.get("http://localehost:3030").then((response) => {
      dispatch(setSecretWord(response.data));
    });
  };
};

export const guessWord = (word) => {
  return (dispatch, getState) => {
    const secretWord = getState().secretWord;
    const letterMatchCount = getLetterMatchCount(word, secretWord);
    dispatch(setGuessedWord(word, letterMatchCount));
    secretWord === word && dispatch(correctGuess());
  };
};
