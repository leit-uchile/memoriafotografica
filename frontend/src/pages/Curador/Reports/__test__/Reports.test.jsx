import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "../../../../test/test-utils";
import Reports from "../Reports";

it("renders without crashing", () => {
  render(<Reports />);
  expect(screen.getByText("Reportes de contenido"));
});

it("is loading", () => {
  render(<Reports reportsStatus={"loading"} />);
  expect(screen.getByRole("status"));
});
