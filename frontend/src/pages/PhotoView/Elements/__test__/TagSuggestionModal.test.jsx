import React from "react";
import "@testing-library/jest-dom";
import { renderWithRouter, screen } from "../../../../test/test-utils";
import userEvent from "@testing-library/user-event";
import TagSuggestionModal from "../TagSuggestionModal";

const tags = [
  { id: 1, value: "beauchef" },
  { id: 100, value: "beauchef851" },
];

const writeTag = (tag) => {
  expect(screen.getByPlaceholderText("Añadir etiquetas"));

  userEvent.type(
    screen.getByPlaceholderText("Añadir etiquetas"),
    `${tag}{enter}`
  );
};

it("renders without crashing", () => {
  renderWithRouter(<TagSuggestionModal tags={tags} photoId={1} />, {
    initialState: {
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
  });

  expect(screen.getByRole("button", { name: "Sugerir" }));
  userEvent.click(screen.getByRole("button", { name: "Sugerir" }));

  expect(screen.getByPlaceholderText("Añadir etiquetas"));
  expect(
    screen.getByText(
      'Para ingresar una nueva etiqueta debe presionar la tecla "Entrar" o "Tabulación"'
    )
  );
  expect(screen.getByText("Enviar Sugerencia"));
  expect(screen.getByText("Cancelar"));
});

it("Write a tag in the tag suggestions", () => {
  renderWithRouter(<TagSuggestionModal tags={tags} photoId={1} />, {
    initialState: {
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
  });

  userEvent.click(screen.getByRole("button", { name: "Sugerir" }));
  writeTag("nuevoBeauchef");
  expect(screen.getByText("nuevoBeauchef"));
});
