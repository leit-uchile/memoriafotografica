import React from "react";
import "@testing-library/jest-dom";
import { renderWithRouter, screen } from "../../../../test/test-utils";
import ReportRow from "../ReportRow";
import ResolveButtons from "../ResolveButtons";

it("renders without crashing", () => {
  renderWithRouter(
    <ReportRow
      report={{
        content: "reason",
        content_id: {
          id: 1,
          content: "",
        },
        created_at: "2021-03-20T16:13:13-03:00",
        id: 1,
        resolved: false,
        resolution_details: "",
        type: 3,
        updated_at: "2021-03-21T16:13:13-03:00",
      }}
      actions={() => {}}
    />
  );
  expect(screen.getByRole("cell", { name: "reason" }));
  expect(screen.getByRole("cell", { name: "3/20/2021" }));
  expect(screen.getByRole("cell", { name: "3/21/2021" }));
});

it("renders buttons", () => {
  renderWithRouter(
    <ReportRow
      report={{
        content: "",
        content_id: {
          id: 1,
          content: "",
        },
        created_at: "2021-03-20T16:13:13-03:00",
        id: 1,
        resolved: false,
        resolution_details: "",
        type: 3,
        updated_at: "2021-03-20T16:13:13-03:00",
      }}
      actions={() => {
        return <ResolveButtons report={{ type: 3 }} />;
      }}
    />
  );
  expect(screen.getByRole("cell", { name: "Pendiente" }));
  expect(screen.getAllByRole("button")).toHaveLength(3);
});

it("renders resolution details", () => {
  renderWithRouter(
    <ReportRow
      report={{
        content: "",
        content_id: {
          id: 1,
          content: "",
        },
        created_at: "2021-03-20T16:13:13-03:00",
        id: 1,
        resolved: true,
        resolution_details: "Contenido censurado",
        type: 3,
        updated_at: "2021-03-20T16:13:13-03:00",
      }}
      actions={() => {
        return "Contenido censurado";
      }}
    />
  );
  expect(screen.getByRole("cell", { name: "Resuelto" }));
  expect(screen.getByRole("cell", { name: "Contenido censurado" }));
});

it("renders user case", () => {
  renderWithRouter(
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
        resolved: false,
        resolution_details: "",
        type: 1,
        updated_at: "2021-03-21T16:13:13-03:00",
      }}
      actions={() => {}}
    />
  );
  expect(screen.getByRole("cell", { name: "Usuario" }));
  expect(screen.getByRole("cell", { name: "Ver perfil de first last" }));
  expect(screen.getByRole("link", { name: "Ver perfil" }));
});

it("renders photo case", () => {
  renderWithRouter(
    <ReportRow
      report={{
        content: "Usuario no es autor del contenido",
        content_id: {
          id: 1,
          thumbnail: "",
        },
        created_at: "2021-03-20T16:13:13-03:00",
        id: 1,
        resolved: false,
        resolution_details: "",
        type: 2,
        updated_at: "2021-03-21T16:13:13-03:00",
      }}
      actions={() => {}}
    />
  );
  expect(screen.getByRole("cell", { name: "Foto" }));
  expect(screen.getByRole("cell", { name: "content Ver imagen" }));
  expect(screen.getByRole("img", { name: "content" }));
  expect(screen.getByRole("link", { name: "Ver imagen" }));
});

it("renders comment case", () => {
  renderWithRouter(
    <ReportRow
      report={{
        content: "Incita a la violencia",
        content_id: {
          id: 1,
          content: "comment",
        },
        created_at: "2021-03-20T16:13:13-03:00",
        id: 1,
        resolved: false,
        resolution_details: "",
        type: 3,
        updated_at: "2021-03-21T16:13:13-03:00",
      }}
      actions={() => {}}
    />
  );
  expect(screen.getByRole("cell", { name: "Comentario" }));
  expect(screen.getByRole("cell", { name: "comment Ver comentario" }));
  expect(screen.getByRole("link", { name: "Ver comentario" }));
});
