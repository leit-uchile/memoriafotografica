import React from "react";
import "@testing-library/jest-dom";
import { renderWithRouter, screen, waitFor } from "../../../test/test-utils";
import userEvent from "@testing-library/user-event";
import Login from "../Login"

it("renders without crashing", () => {
    renderWithRouter(<Login />);
    expect(screen.getByPlaceholderText("Correo Electronico"))
    expect(screen.getByPlaceholderText("Contraseña"))
    expect(screen.getByText("Entrar"))
})

it("displays error message", async () =>{
    renderWithRouter(<Login />);
    expect(screen.getByText("Entrar"))
    userEvent.click(screen.getByText("Entrar"))
    await waitFor(() => screen.getByText("No podemos ingresarte al sitio"))
})