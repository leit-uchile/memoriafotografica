import React from "react";
import "@testing-library/jest-dom";
import { renderWithRouter, screen, waitFor } from "../../../test/test-utils";
import AllCollections from "../";

it("renders without crashing", async () => {
  renderWithRouter(<AllCollections />);
  await waitFor(() => expect(screen.getByText("collection title")));
  expect(screen.getByLabelText("generic page navigation"));
});
