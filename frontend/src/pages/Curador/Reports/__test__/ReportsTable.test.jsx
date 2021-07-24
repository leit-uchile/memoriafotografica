import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "../../../../test/test-utils";
import ReportsTable from "../ReportsTable";

it("renders without crashing", () => {
  render(<ReportsTable reports={[]} />);
  expect(screen.getByText("Tipo"));
  expect(screen.getByText("Detalles"));
  expect(screen.getByText("Motivo"));
  expect(screen.getByText("Estado"));
  expect(screen.getByText("Reportado el"));
  expect(screen.getByText("Última actualización"));
  expect(screen.getByText("Acción"));
});
