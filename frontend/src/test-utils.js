import React from "react";
import { render as rtlRender } from "@testing-library/react";
import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { Provider } from "react-redux";
import { Router } from "react-router";
import { createMemoryHistory } from "history";
import rootReducer from "./reducers";

// Reference https://redux.js.org/recipes/writing-tests#connected-components
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
function renderWithRouter(
  ui,
  {
    route = "/",
    history = createMemoryHistory({ initialEntries: [route] }),
    ...renderOptions
  } = {}
) {
  return {
    ...render(<Router history={history}>{ui}</Router>, { ...renderOptions }),
    history,
  };
}

// re-export everything
export * from "@testing-library/react";
// override render method and add
// Router wrapper for routes
export { render, renderWithRouter };
