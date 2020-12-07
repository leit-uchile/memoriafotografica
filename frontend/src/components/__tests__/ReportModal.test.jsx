import React from "react";
import "@testing-library/jest-dom";
import { renderWithRouter, render, screen } from "../../test-utils";
import userEvent from "@testing-library/user-event";
import ReportModal from "../ReportModal";

it("renders without crashing", () => {
  render(
    <ReportModal
      reportType={1}
      reportTitle={"Titulo"}
      options={["opcion 1", "opcion 2"]}
      helpText={"ayuda"}
    />
  );
  expect(screen.getByRole("button"));
});

it("opens modal", () => {
  renderWithRouter(
    <ReportModal
      reportType={1}
      reportTitle={"Titulo"}
      options={["opcion 1", "opcion 2"]}
      helpText={"ayuda"}
    />
  );
  userEvent.click(screen.getByRole("button"));
  expect(
    screen.getByText("Debes ingresar a la plataforma para poder reportar")
  );
});

it("displays options correctly", () => {
  renderWithRouter(
    <ReportModal
      reportType={1}
      reportTitle={"Titulo"}
      options={["opcion 1", "opcion 2"]}
      helpText={"ayuda"}
    />,
    { initialState: { user: { isAuthenticated: true } } }
  );
  userEvent.click(screen.getByRole("button"));
  expect(screen.getByText("Titulo"));
  expect(screen.getByText("opcion 1"));
  expect(screen.getByText("opcion 2"));
});
