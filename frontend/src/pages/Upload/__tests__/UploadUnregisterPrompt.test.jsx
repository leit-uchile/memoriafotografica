import React from "react";
import "@testing-library/jest-dom";
import { renderWithRouter, screen } from "../../../test/test-utils";
import UnregisterPrompt from "../Steps/UnregisterPrompt"

it("renders without crashing", () => {
    renderWithRouter(<UnregisterPrompt nextStep={() =>{}}/>)
    expect(screen.getByText("Iniciar sesion"))
    expect(screen.getByText("Registrarme"))
})