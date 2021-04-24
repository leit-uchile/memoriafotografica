import React from "react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { render, screen } from "../../../test-utils";
import Home from "../Home";

it("renders without crashing", () => {
  render(<Home />);
  expect(screen.getByText("Todas las fotografías"));
});
