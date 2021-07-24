import React from "react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { render, screen } from "../../../test/test-utils";
import UploadDetails from "../Steps/UploadDetailsv2";

const file = new File(["hello"], "hello.png", { type: "image/png" });
const defaultProps = {
  photo: file,
  save: () => {},
  delete: () => {},
  meta: {
    description: "",
    tags: [],
    cc: null,
    previewCalled: false,
    collapse: false,
  },
  suggestions: [],
  search: () => {},
};

it("renders without crashing", () => {
  render(<UploadDetails {...defaultProps} />);
  expect(screen.getByText("Descripción:"));
  expect(screen.getByText("Información adicional"));
});

it("saves on parent", () => {
  const parentSave = jest.fn();
  render(<UploadDetails {...defaultProps} save={parentSave} />);
  userEvent.type(
    screen.getByPlaceholderText("Historia asociada a la foto"),
    "texto de prueba"
  );
  expect(parentSave).toHaveBeenCalled();
});

it("deletes on parent", () => {
  const parentDelete = jest.fn();
  render(<UploadDetails {...defaultProps} delete={parentDelete} />);
  userEvent.click(screen.getByTestId("delete-image"));
  expect(parentDelete).toHaveBeenCalled();
});
