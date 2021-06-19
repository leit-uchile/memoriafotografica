import React from "react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event"
import { render, screen } from "../../../test/test-utils";
import UploadAlbum from "../Steps/UploadAlbum";

const defaultProps = {
  isAuth: false,
  saveAll: () => {},
  sendAlert: () => {},
  nextStep: () => {},
  previousStep: () => {},
  meta: [],
  searchMeta: () => {},
};

it("renders without crashing", async () => {
  render(<UploadAlbum {...defaultProps} />);
  expect(screen.getByText("Añadir etiquetas"));
  expect(screen.getByText("Licencias: Permisos de acceso e intercambio"));
  expect(screen.getByText("Volver"));
});

it("renders doesn't render the previous step if logged in", async () => {
  render(<UploadAlbum {...defaultProps} isAuth={true} />);
  expect(screen.getByText("Añadir etiquetas"));
  expect(screen.getByText("Licencias: Permisos de acceso e intercambio"));
  expect(screen.queryByText("Volver")).toBeNull();
});

it("calls the API on metadata search", async () => {
    const onAPICall = jest.fn()
    render(<UploadAlbum {...defaultProps} isAuth={true} searchMeta={onAPICall}/>);
    expect(screen.getByText("Añadir etiquetas"));
    expect(screen.getByText("Licencias: Permisos de acceso e intercambio"));
    expect(screen.queryByText("Volver")).toBeNull();
    userEvent.type(screen.getByText("Añadir etiquetas"),"Test text")
    expect(onAPICall).toHaveBeenCalledTimes(8)
  });
  