import React from "react";
import "@testing-library/jest-dom";
import { Route, Switch } from "react-router-dom";
import { renderWithRouter, waitFor, screen } from "../../../test/test-utils";
import userEvent from "@testing-library/user-event";
import CollectionView from "../CollectionView";

it("renders without crashing", async () => {
  renderWithRouter(
    <Switch location={{ pathname: "/test/1" }}>
      <Route
        path="/test/:id/"
        component={(props) => <CollectionView {...props} />}
      />
    </Switch>
  );
  await waitFor(() =>
    expect(screen.getByText("Ver como línea de tiempo")).toBeDisabled()
  );
  await waitFor(() =>
    expect(screen.getByText("Ver como galería")).toBeInTheDocument()
  );
  expect(screen.getByText("Colección: title"));
  expect(screen.getByText("description"));
});

it("has a gallery render mode", async () => {
  renderWithRouter(
    <Switch location={{ pathname: "/test/1" }}>
      <Route
        path="/test/:id/"
        component={(props) => <CollectionView {...props} />}
      />
    </Switch>
  );
  await waitFor(() =>
    expect(screen.getByText("Ver como línea de tiempo")).toBeDisabled()
  );
  userEvent.click(screen.getByText("Ver como galería"));
  await waitFor(() =>
    expect(screen.getByText("Ver como galería")).toBeDisabled()
  );
});
