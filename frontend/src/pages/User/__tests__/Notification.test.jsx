import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "../../../test/test-utils";
import Notification from "../Notification";

it("renders without crashing", () => {
  render(
    <Notification
      element={{
        id: 1,
        type: 1,
        content: 1,
        message: "Una de sus fotografías ha sido aprobada.",
        created_at: "2021-04-24T12:20:47.416414-04:00",
        read: false,
      }}
    />
  );
  expect(screen.getByText("Aprobación"));
  expect(screen.getByText("Una de sus fotografías ha sido aprobada."));
  expect(screen.getByRole("button"));
});
