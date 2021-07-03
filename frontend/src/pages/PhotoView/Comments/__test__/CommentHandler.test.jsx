import React from "react";
import "@testing-library/jest-dom";

import { renderWithRouter, screen, within } from "../../../../test/test-utils";
import userEvent from "@testing-library/user-event";
import { server, rest } from "../../../../test/server";

import CommentHandler from "../CommentHandler";
it("renders without crashing", async () => {
  renderWithRouter(<CommentHandler id={1} />, {
    initialState: {
      user: {
        isAuthenticated: true,
        userData: {
          id: 1,
          first_name: "User",
          last_name: "User",
          user_type: 1,
          isStaff: false,
        },
      },
    },
  });
  expect(await screen.findByText("buena foto men")).toBeInTheDocument();
  expect(await screen.findByText("gracias men")).toBeInTheDocument();
  
});
