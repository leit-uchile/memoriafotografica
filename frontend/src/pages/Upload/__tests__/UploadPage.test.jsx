import React from "react";
import "@testing-library/jest-dom";
import { renderWithRouter, screen } from "../../../test/test-utils";
import UploadPage from "../UploadPage"

it("renders default step", async () => {
    renderWithRouter(<UploadPage />)
    expect(screen.getByText("Iniciar sesion"))
    expect(screen.getByText("Registrarme"))
})

it("renders second step if logged in", async () => {
    renderWithRouter(<UploadPage />, {initialState: {
        user: {
          isAuthenticated: true,
          userData: {
            id: 1,
            first_name: "user",
            last_name: "user",
            user_type: 1,
            isStaff: false,
          },
        },
      },
    })
    expect(screen.getByText("Añadir etiquetas"))
    expect(screen.getByText("Licencias: Permisos de acceso e intercambio"))
})