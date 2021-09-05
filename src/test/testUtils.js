import checkPropTypes from "check-prop-types";
import { createStore, applyMiddleware } from "redux";
import rootReducer from "../reducers/rootReducer";
import { middlewares } from "../configurStore";

export const storeFactory = (initialState) => {
  return createStore(rootReducer, initialState, applyMiddleware(...middlewares));
};

export const findByDataAttr = (wrapper, dataAttr) => {
  return wrapper.find(`[data-test='${dataAttr}']`);
};

export const checkProps = (component, confirmingProps) => {
  const propError = checkPropTypes(component.propTypes, confirmingProps, "prop", component.name);
  expect(propError).toBeUndefined();
};
