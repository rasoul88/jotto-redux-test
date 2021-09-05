import { Component } from "react";
import { connect } from "react-redux";
import GuessedWords from "./guessedWords";
import Congrats from "./congrats";
import Input from "./input";
import "./App.css";
import { getSecretWord } from "./actions/actions";

export class UnconnectedApp extends Component {
  componentDidMount() {
    this.props.getSecretWord();
  }
  render() {
    const { success, secretWord, guessedWords } = this.props;
    return (
      <div className="container">
        <h1>Jotto App</h1>
        <Input />
        <Congrats success={success} />
        <GuessedWords guessedWords={guessedWords} />
      </div>
    );
  }
}

const mapStateToProps = ({ success, secretWord, guessedWords }) => ({
  success,
  secretWord,
  guessedWords,
});

const mapDispatchToProps = (dispatch) => ({
  getSecretWord: () => dispatch(getSecretWord()),
});

export default connect(mapStateToProps, mapDispatchToProps)(UnconnectedApp);
