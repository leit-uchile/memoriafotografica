import React from "react";
import "@testing-library/jest-dom";
import { renderWithRouter, screen } from "../../test/test-utils";
import Header from "../Layout/Header";

it("renders without crashing", () => {
  renderWithRouter(<Header />, {
    initialState: {
      user: {
        isAuthenticated: false,
      },
    },
  });
  expect(screen.getByText("Ingresar"));
});

it("renders user modal", () => {
  renderWithRouter(<Header />, {
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
  expect(screen.getByText("user user"));
});
