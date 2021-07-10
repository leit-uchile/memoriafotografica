import React from "react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import {
  renderWithRouter,
  screen,
  act,
  waitFor,
} from "../../../test/test-utils";
import UploadPhoto from "../Steps/UploadPhotov3";

const file = new File(["hello"], "hello.png", { type: "image/png" });

const defaultProps = {
  nextStep: () => {},
  previousStep: () => {},
  sendAlert: () => {},
  searchMeta: () => {},
};

it("renders without crashing", () => {
  renderWithRouter(
    <UploadPhoto {...defaultProps} photoInfo={{ date: "", tags: [], cc: "" }} />
  );
  expect(screen.getByText("Arrastra y suelta una imagen o haz click aqui"));
  expect(screen.getByText("Volver"));
});

it("Shows button when uploading button", async () => {

  renderWithRouter( <UploadPhoto {...defaultProps} photoInfo={{ date: "", tags: [], cc: "" }} />);
  const dropzone = screen.getByText(
    "Arrastra y suelta una imagen o haz click aqui"
  ).parentNode;
  userEvent.upload(dropzone.firstChild, file);

  await waitFor(() => expect(screen.getByText("Finalizar")));
});
