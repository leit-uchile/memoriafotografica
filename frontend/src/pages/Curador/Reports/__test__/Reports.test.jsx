import React from "react";
import "@testing-library/jest-dom";
import {
  render,
  renderWithRouter,
  screen,
  waitFor,
} from "../../../../test/test-utils";
import Reports from "../Reports";

it("renders without crashing", () => {
  render(<Reports />);
  expect(screen.getByText("Reportes de contenido"));
  expect(screen.getByRole("button", { name: "¿Ayuda?" }));
  expect(screen.getByRole("button", { name: "Filtrar" }));
  expect(screen.getByRole("option", { name: "12 por página" }));
});

it("is loading", () => {
  render(<Reports reportsStatus={"loading"} />);
  expect(screen.getByRole("status"));
});

it("displays correctly", async () => {
  renderWithRouter(<Reports />);
  await waitFor(() => {
    expect(screen.getAllByRole("cell")).toHaveLength(7 * 5); // 7 columns for each report
    expect(screen.getByLabelText("reports page navigation"));
  });
});
