import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "../../../../test/test-utils";
import EditCommentModal from "../EditCommentModal";

it("renders without crashing", () => {
  render(
    <EditCommentModal
      report={{ content_id: { content: "" } }}
      isOpen={true}
      handleToggle={() => {}}
      editComment={() => {}}
      updating={""}
    />
  );
  expect(screen.getByText("Editar comentario"));
  expect(screen.getByRole("button", { name: "Close" }));
  expect(screen.getByRole("button", { name: "Guardar cambios" }));
  expect(screen.getByRole("button", { name: "Cancelar" }));
});

it("displays correctly", () => {
  render(
    <EditCommentModal
      report={{ content_id: { content: "" } }}
      isOpen={true}
      handleToggle={() => {}}
      editComment={() => {}}
      updating={""}
    />
  );
  expect(screen.getByText("Comentario"));
  expect(screen.getByRole("textbox"));
});
