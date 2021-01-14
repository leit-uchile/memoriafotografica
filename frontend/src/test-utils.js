import React from "react";
import { render as rtlRender } from "@testing-library/react";
import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import rootReducer from "./reducers";

// Reference https://redux.js.org/recipes/writing-tests#connected-components
// Wrap render with a custom store that we can supply
// with and initialState
function render(
  ui,
  {
    initialState,
    store = createStore(
      rootReducer,
      initialState,
      composeWithDevTools(applyMiddleware(thunk))
    ),
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }) {
    return <Provider store={store}>{children}</Provider>;
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

// Reference https://www.rockyourcode.com/test-redirect-with-jest-react-router-and-react-testing-library/
// No longer using reference since we use BrowserRouter
// Wrap with Router the UI so we can use Link, Redirect and query params
function renderWithRouter(ui, { ...renderOptions } = {}) {
  return {
    ...render(<Router>{ui}</Router>, { ...renderOptions }),
  };
}

// re-export everything
export * from "@testing-library/react";
// override render method and add
// Router wrapper for routes
export { render, renderWithRouter };
