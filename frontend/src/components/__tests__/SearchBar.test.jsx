import React from "react";
import "@testing-library/jest-dom";
import { renderWithRouter, screen } from "../../test-utils";
import SearchBar from "../Layout/SearchBar";

it("renders without crashing", () => {
  renderWithRouter(<SearchBar />);
  expect(screen.getByText("Todo el sitio"));
});
