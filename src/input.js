import React from "react";
import { connect } from "react-redux";
import { guessWord } from "./actions/actions";

export class UnconnectedInput extends React.Component {
  state = {
    currentGuess: null,
  };

  render() {
    const submitGuessWord = () => {
      const guessedWord = this.state.currentGuess;
      if (guessedWord && guessWord.length > 0) this.props.guessWord(guessedWord);
      this.setState({ currentGuess: "" });
    };

    return (
      <div data-test="component-input">
        {!this.props.success && (
          <form className="form-inline">
            <input data-test="input-box" type="text" className="mb2 mx-sm-3" placeholder="Enter guess" />
            <button data-test="submit-button" className="btn btn-primary mb-2" onClick={submitGuessWord}>
              submit
            </button>
          </form>
        )}
      </div>
    );
  }
}

const mapStateToProps = ({ success }) => ({
  success,
});

const mapDispatchToProps = (dispatch) => ({
  guessWord: (word) => dispatch(guessWord(word)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UnconnectedInput);
