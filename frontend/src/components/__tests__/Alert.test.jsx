import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "../../test-utils";
import Alert from "../Layout/Alert";

it("renders without crashing", () => {
  render(<Alert />, {
    initialState: {
      site_misc: { alerts: [{ id: 1, msg: "error", alertType: "warning" }] },
    },
  });
  expect(screen.getByText("error"));
});
