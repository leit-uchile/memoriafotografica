import React from "react";
import "@testing-library/jest-dom";
import fireEvent from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import { render, screen } from "../../../test-utils";
import AdvancedSearch from "../AdvancedSearch";

it("renders without crashing", () => {
  render(<AdvancedSearch />);
  expect(screen.getByText("Búsqueda Avanzada"));
});

it("open modal", () => {
  render(<AdvancedSearch />);
  userEvent.click(screen.getByText("Búsqueda Avanzada"));
  expect(screen.getByText("Por fecha"));
});
