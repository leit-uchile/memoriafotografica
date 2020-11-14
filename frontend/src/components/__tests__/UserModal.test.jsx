import React from "react";
import "@testing-library/jest-dom";
import { renderWithRouter, screen } from "../../test-utils";
import UserModal from "../UserModal";
import userEvent from "@testing-library/user-event";

it("renders without crashing", () => {
  renderWithRouter(<UserModal />, {
    initialState: {
      user: {
        userData: {
          id: 1,
          first_name: "user",
          last_name: "user",
          user_type: 1,
          isStaff: false,
        },
      },
    },
  });
  expect(screen.getByText("user user"));
});

it("opens modal for colaborator", () => {
  renderWithRouter(<UserModal />, {
    initialState: {
      user: {
        userData: {
          id: 1,
          first_name: "user",
          last_name: "user",
          user_type: 1,
          isStaff: false,
        },
      },
    },
  });
  userEvent.click(screen.getByText("user user"));
  expect(screen.getByText("Gestionar perfil"));
});

it("opens modal for curador", () => {
  renderWithRouter(<UserModal />, {
    initialState: {
      user: {
        userData: {
          id: 1,
          first_name: "user",
          last_name: "user",
          user_type: 2,
          isStaff: true,
        },
      },
    },
  });
  userEvent.click(screen.getByText("user user"));
  expect(screen.getByText("Gestionar perfil"));
  expect(screen.getByText("Interfaz de curador"));
});

it("opens modal for administrator", () => {
  renderWithRouter(<UserModal />, {
    initialState: {
      user: {
        userData: {
          id: 1,
          first_name: "user",
          last_name: "user",
          user_type: 3,
          isStaff: true,
        },
      },
    },
  });
  userEvent.click(screen.getByText("user user"));
  expect(screen.getByText("Gestionar perfil"));
  expect(screen.getByText("Interfaz de curador"));
  expect(screen.getByText("Interfaz de Administrador"));
});
