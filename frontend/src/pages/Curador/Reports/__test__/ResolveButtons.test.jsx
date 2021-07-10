import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "../../../../test/test-utils";
import userEvent from "@testing-library/user-event";
import ResolveButtons from "../ResolveButtons";

it("renders without crashing", () => {
  render(<ResolveButtons report={{ type: 1 }} />);
  expect(screen.getAllByRole("button").length == 3);
});

it("opens modal", () => {
  render(<ResolveButtons report={{ type: 1, content_id: { id: 1 }}} />);
  userEvent.click(screen.getAllByRole("button")[0]);
  expect(
    screen.getByRole("dialog")
  );
});
