import React from "react";
import "@testing-library/jest-dom";
import { renderWithRouter, screen } from "../../../test/test-utils";
import UploadSuccess from "../Steps/UploadSuccess";

const defaultStepProps = {nextStep: () =>{}, previousStep: () => {}}

it("renders without crashing", () => {
    renderWithRouter(<UploadSuccess {...defaultStepProps}/>);
    expect(screen.getByText("Crear album"));
    expect(screen.getByText("¡Subir más!"));
  });