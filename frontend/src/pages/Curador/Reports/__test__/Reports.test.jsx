import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "../../../../test/test-utils";
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
