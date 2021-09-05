import React from "react";
import { shallow } from "enzyme";
import { findByDataAttr, storeFactory } from "./test/testUtils";
import Input, { UnconnectedInput } from "./input";

const setup = (initialState = {}) => {
  const store = storeFactory(initialState);
  const wrapper = shallow(<Input store={store} />).dive();
  // console.log("wrapper", wrapper.debug());
  return wrapper;
};

describe("render", () => {
  describe("word has not been guessed", () => {
    let wrapper;
    beforeEach(() => {
      const initialState = { success: false };
      wrapper = setup(initialState).dive();
    });

    test("renders component without error", () => {
      const component = findByDataAttr(wrapper, "component-input");
      expect(component.length).toBe(1);
    });
    test("renders input box", () => {
      const inputBox = findByDataAttr(wrapper, "input-box");
      expect(inputBox.length).toBe(1);
    });
    test("renders submit button", () => {
      const submitButton = findByDataAttr(wrapper, "submit-button");
      expect(submitButton.length).toBe(1);
    });
  });

  describe("word has been guessed", () => {
    let wrapper;
    beforeEach(() => {
      const initialState = { success: true };
      wrapper = setup(initialState).dive();
    });

    test("renders component without error", () => {
      const component = findByDataAttr(wrapper, "component-input");
      expect(component.length).toBe(1);
    });
    test("does not render input box", () => {
      const inputBox = findByDataAttr(wrapper, "input-box");
      expect(inputBox.length).toBe(0);
    });
    test("does not render submit button", () => {
      const submitButton = findByDataAttr(wrapper, "submit-button");
      expect(submitButton.length).toBe(0);
    });
  });
});

describe("redux props", () => {
  test("has `success` piece of state as prop", () => {
    const success = true;
    const wrapper = setup({ success });
    // console.log("wrapper.props()", wrapper.props());
    expect(wrapper.props().success).toBe(true);
  });
  test("`guessWord` action creator is function prop", () => {
    const wrapper = setup();
    expect(wrapper.props().guessWord).toBeInstanceOf(Function);
  });
});

describe("`guessWord` action  call", () => {
  let wrapper;
  let guessWordMock;
  let guessedWord = "train";
  beforeEach(() => {
    //create a mock function for `guessWord`
    guessWordMock = jest.fn();

    const props = {
      guessWord: guessWordMock,
    };
    //set up Input with `guessWord` as a prop
    wrapper = shallow(<UnconnectedInput {...props} />);

    //add value to input box
    wrapper.setState({ currentGuess: guessedWord });

    //simulate click on submit button
    const submitButton = findByDataAttr(wrapper, "submit-button");
    submitButton.simulate("click");
  });

  test("call `guessWord` when submit is called", () => {
    const guessWordMockCount = guessWordMock.mock.calls.length;
    expect(guessWordMockCount).toBe(1);
  });

  test("calls `guessWord` with correct argument", () => {
    const guessWordArg = guessWordMock.mock.calls[0][0];
    console.log(guessWordMock.mock.calls);
    expect(guessWordArg).toBe(guessedWord);
  });

  test("clears input box on submit", () => {
    expect(wrapper.state("currentGuess")).toBe("");
  });
});
