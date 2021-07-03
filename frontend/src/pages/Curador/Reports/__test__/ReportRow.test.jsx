import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "../../../../test/test-utils";
import ReportRow from "../ReportRow";

it("renders without crashing", () => {
  render(
    <ReportRow
      report={{
        content: "Finge ser otra persona",
        content_id: {
          id: 1,
          first_name: "first",
          last_name: "last",
        },
        created_at: "2021-03-20T16:13:13-03:00",
        id: 1,
        resolved: true,
        resolution_details: "Contenido censurado",
        type: 1,
        updated_at: "2021-03-20T16:13:13-03:00",
      }}
      actions={() => {}}
    />
  );
  expect(screen.getByText("Usuario"));
  expect(screen.getByText("Ver perfil de first last"));
  expect(screen.getByText("Finge ser otra persona"));
  expect(screen.getByText("Resuelto"));
  expect(screen.getByText("27/3/2021"));
  expect(screen.getByText("5/6/2021"));
  expect(screen.getByText("Contenido censurado"));
});
