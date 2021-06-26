import React from "react";
import "@testing-library/jest-dom"
import userEvent from "@testing-library/user-event"
import { render, screen } from "../../../test/test-utils";
import UploadProgress from "../Steps/UploadProgress";

it("renders without crashing", () => {
  render(
    <UploadProgress
      upload={{}}
      buttonLabel={"Test label"}
      retry={() => {}}
      goToNextStep={() => {}}
      edit={() => {}}
    />
  );
  expect(screen.getByText("Test label"));
});

it("renders a modal without crashing", () => {
    render(
      <UploadProgress
        buttonLabel={"Test label"}
        retry={() => {}}
        goToNextStep={() => {}}
        edit={() => {}}
      />
    );
    expect(screen.getByText("Test label"));
    userEvent.click(screen.getByText("Test label"))
    expect(screen.getByText("Subir Fotografía"));
});

it("renders a starting loading message", () => {
    render(
      <UploadProgress
        buttonLabel={"Test label"}
        retry={() => {}}
        goToNextStep={() => {}}
        edit={() => {}}
      />, {initialState: {
        upload: {
            uploading: true,
            photosUploading: 2,
            opsFinished: 0,
            error: []
        },
      },
    }
    );
    expect(screen.getByText("Test label"));
    userEvent.click(screen.getByText("Test label"))
    expect(screen.getByText("Enviando aporte..."));
});

it("renders a operation success", () => {
    render(
      <UploadProgress
        buttonLabel={"Test label"}
        retry={() => {}}
        goToNextStep={() => {}}
        edit={() => {}}
      />, {initialState: {
        upload: {
            uploading: false,
            photosUploading: 2,
            opsFinished: 2,
            error: []
        },
      },
    }
    );
    expect(screen.getByText("Test label"));
    userEvent.click(screen.getByText("Test label"))
    expect(screen.getByText("¡Operación completada!"));
});


it("renders a retry button on errors", () => {
    render(
      <UploadProgress
        buttonLabel={"Test label"}
        retry={() => {}}
        goToNextStep={() => {}}
        edit={() => {}}
      />, {initialState: {
        upload: {
            uploading: false,
            photosUploading: 2,
            opsFinished: 1,
            error: [2]
        },
      },
    }
    );
    expect(screen.getByText("Test label"));
    userEvent.click(screen.getByText("Test label"))
    expect(screen.getByText("¡Operación completada!"));
    expect(screen.getByText("Reintentar"));
});