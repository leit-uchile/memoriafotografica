import React from "react";
import "@testing-library/jest-dom";
import { render, screen, waitFor } from "../../../../test/test-utils";
import EditUserModal from "../EditUserModal";

it("renders without crashing", () => {
  render(
    <EditUserModal
      report={{ content_id: { id: 1 } }}
      isOpen={true}
      handleToggle={() => {}}
      editUser={() => {}}
      updating={""}
    />
  );
  expect(screen.getByText("Editar usuario"));
  expect(screen.getByRole("button", { name: "Close" }));
  expect(screen.getByRole("button", { name: "Guardar cambios" }));
  expect(screen.getByRole("button", { name: "Cancelar" }));
});

it("is loading", () => {
  render(
    <EditUserModal
      report={{ content_id: { id: 1 } }}
      isOpen={true}
      handleToggle={() => {}}
      editUser={() => {}}
      updating={""}
    />
  );
  expect(screen.getByRole("status"));
});

it("displays correctly", async () => {
  render(
    <EditUserModal
      report={{ content_id: { id: 1 } }}
      isOpen={true}
      handleToggle={() => {}}
      editUser={() => {}}
      updating={""}
    />
  );
  await waitFor(() => {
    expect(screen.getByText("Nombre"));
    expect(screen.getByDisplayValue("first"));
  });
});

it("is updating", async () => {
  render(
    <EditUserModal
      report={{ content_id: { id: 1 } }}
      isOpen={true}
      handleToggle={() => {}}
      editUser={() => {}}
      updating={"loading"}
    />
  );
  await waitFor(() => {
    expect(screen.getByRole("status"));
  });
});
