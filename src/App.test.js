import { shallow } from "enzyme";
import { storeFactory } from "./test/testUtils";
import App, { UnconnectedApp } from "./App";

const setup = (state = {}) => {
  const store = storeFactory(state);
  return shallow(<App store={store} />).dive();
};

describe("redux properties in App", () => {
  test("has access to `success` prop", () => {
    const success = true;
    const wrapper = setup({ success });
    expect(wrapper.props().success).toBe(true);
  });

  test("has access to `secretWord` prop", () => {
    const secretWord = "party";
    const wrapper = setup({ secretWord });
    expect(wrapper.props().secretWord).toBe("party");
  });

  test("has access to `guessedWords` prop", () => {
    const guessedWords = [
      { guessedWord: "trian", letterMatchCount: 3 },
      { guessedWord: "agile", letterMatchCount: 1 },
      { guessedWord: "party", letterMatchCount: 5 },
    ];
    const wrapper = setup({ guessedWords });
    expect(wrapper.props().guessedWords).toEqual(guessedWords);
  });

  test("`getSecretWord` action creator is function prop", () => {
    const wrapper = setup();
    expect(wrapper.props().getSecretWord).toBeInstanceOf(Function);
  });
});

test("`getSecretWord` runs on app mount", () => {
  const getSecretWordMock = jest.fn();
  const props = {
    success: false,
    getSecretWord: getSecretWordMock,
    guessedWords: [],
  };
  const wrapper = shallow(<UnconnectedApp {...props} />);
  wrapper.instance().componentDidMount();

  const getSecretWordCallCount = getSecretWordMock.mock.calls.length;
  expect(getSecretWordCallCount).toBe(1);
});
